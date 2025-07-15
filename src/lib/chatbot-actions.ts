
import type { NextRouter } from 'next/router';

class ActionProvider {
    createChatBotMessage: any;
    setState: any;
    router: any;
    
    constructor(createChatBotMessage: any, setStateFunc: any, router: NextRouter) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.router = router;
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

    handleNavigation(page: string) {
        const pathMap: { [key: string]: string } = {
            'about': '/about',
            'portfolio': '/portfolio',
            'contact': '/contact',
            'faq': '/faq',
            'home': '/'
        };
        const path = pathMap[page.toLowerCase()];

        if(path) {
            const botMessage = this.createChatBotMessage(`Navigating you to the ${page} page.`);
            this.updateChatbotState(botMessage);
            this.router.push(path);
        } else {
            const botMessage = this.createChatBotMessage(`I'm sorry, I can't navigate to the '${page}' page. I can navigate to: home, about, portfolio, contact, or faq.`);
            this.updateChatbotState(botMessage);
        }
    }

    handleDefault() {
        const botMessage = this.createChatBotMessage("I'm not sure how to respond to that. You can ask me to 'navigate to a page' or ask about 'services', 'portfolio', or 'contact' information.");
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
