
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
        } else {
            this.actionProvider.handleDefault();
        }
    }
}

export default MessageParser;
