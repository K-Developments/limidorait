
class ActionProvider {
    createChatBotMessage: any;
    setState: any;
    
    constructor(createChatBotMessage: any, setStateFunc: any) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    handleHello() {
        const botMessage = this.createChatBotMessage('Hello. Nice to meet you.');
        this.updateChatbotState(botMessage);
    }
    
    handleServices() {
        const botMessage = this.createChatBotMessage(
            "We offer Web Development, UI/UX Design, Branding, and Mobile App solutions. Which one are you interested in?"
        );
        this.updateChatbotState(botMessage);
    }

    handleDefault() {
        const botMessage = this.createChatBotMessage("I'm not sure how to respond to that. You can ask me about our 'services', 'portfolio', or 'contact' information.");
        this.updateChatbotState(botMessage);
    }
    
    handleContact() {
        const botMessage = this.createChatBotMessage("You can reach us through our contact page or by emailing contact@limidora.com.");
        this.updateChatbotState(botMessage);
    }
    
    handlePortfolio() {
        const botMessage = this.createChatBotMessage("You can view our work on the portfolio page. We're very proud of it!");
        this.updateChatbotState(botMessage);
    }

    updateChatbotState(botMessage: any) {
        this.setState((prevState: any) => ({
            ...prevState,
            messages: [...prevState.messages, botMessage],
        }));
    }
}

export default ActionProvider;
