
module.exports = messageConverter = (jiraMessage) => {
    const eventType = jiraMessage.webhookEvent;
    let eventValue = '';
    switch(eventType){
        case 'jira:issue_created':
            eventValue = 'created issue';
            break;
        case 'jira:issue_updated':
            eventValue = 'updated issue';
            break;
        case 'jira:issue_deleted':
            eventValue = 'deleted issue';
            break;
        case 'jira:issue_deleted':
            eventValue = 'deleted issue';
            break; 
        case 'attachment_created':
            eventValue = 'created attachment';
            break;
        case 'attachment_deleted':
            eventValue = 'deleted attachment';
            break; 
        case 'worklog_created':
            eventValue = 'created worklog';
            break;
        case 'worklog_updated':
            eventValue = 'updated worklog';
            break;
        case 'worklog_deleted':
            eventValue = 'deleted worklog';
            break;
        case 'issuelink_created':
            eventValue = 'created issuelink';
            break;
        case 'issuelink_deleted':
            eventValue = 'deleted issuelink';
            break;
        case 'issue_property_set':
            eventValue = 'created or updated issue property';
            break;
        case 'issue_property_deleted':
            eventValue = 'deleted issue property';
            break;
        case 'comment_created':
            eventValue = 'created comment';
            break;
        case 'comment_updated':
            eventValue = 'updated comment';
            break;
        case 'comment_deleted':
            eventValue = 'deleted comment';
            break;
        default:
            console.log('Invalid webhook event');
            
    }
    const COLOR = (eventType.includes('created')) ? '1141134' : (eventType.includes('updated')) ? '15770880' : '15844367';
    return {
        username: 'Jira',
        embeds: [{
            title: `${jiraMessage.issue.key} - ${jiraMessage.issue.fields.summary}`,
            url: `${jiraMessage.issue.self}`,
            description: `[@${jiraMessage.user.name}](${jiraMessage.user.self}) ${eventValue} : ${jiraMessage.issue.key}`,
            color: COLOR,
            "fields": [{
                "name": "Comment",
                "value": `${jiraMessage.comment.body}`
            }]
        }]
    };
}