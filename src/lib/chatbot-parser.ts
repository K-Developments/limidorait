
class MessageParser {
    actionProvider: any;
    
    constructor(actionProvider: any) {
        this.actionProvider = actionProvider;
    }

    parse(message: string) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            this.actionProvider.handleHello();
        } else if (lowerCaseMessage.includes('service')) {
            this.actionProvider.handleServices();
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email')) {
            this.actionProvider.handleContact();
        } else if (lowerCaseMessage.includes('portfolio') || lowerCaseMessage.includes('work')) {
            this.actionProvider.handlePortfolio();
        } else if (lowerCaseMessage.startsWith('navigate to')) {
            const page = lowerCaseMessage.split('navigate to')[1].trim();
            this.actionProvider.handleNavigation(page);
        } else if (lowerCaseMessage.startsWith('go to')) {
            const page = lowerCaseMessage.split('go to')[1].trim();
            this.actionProvider.handleNavigation(page);
        }
        else {
            this.actionProvider.handleDefault();
        }
    }
}

export default MessageParser;
