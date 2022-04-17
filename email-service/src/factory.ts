abstract class LetterCreator {
    public abstract factoryMethod(): Letter;

    public getLetter(): string {
        const template = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${template.createLetter()}`;
    }
}

class onNewUserLetterCreator extends LetterCreator {
    public factoryMethod(): Letter {
        return new onNewUserLetter();
    }

    public getLetter(): string {
        const template = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${template.createLetter()}`;
    }
}

class onUpdateUserLetterCreator extends LetterCreator {
    public factoryMethod(): Letter {
        return new onUpdateUserLetter();
    }

    public getLetter(): string {
        const template = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${template.createLetter()}`;
    }
}

interface Letter {
    createLetter(): string;
}

class onNewUserLetter implements Letter {
    public createLetter(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class onUpdateUserLetter implements Letter {
    public createLetter(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

function createLetter(creator: LetterCreator) {
    console.log(creator.getLetter());
}

createLetter(new onNewUserLetterCreator());

createLetter(new onUpdateUserLetterCreator());