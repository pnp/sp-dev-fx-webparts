export type GridItem = {
    number: number;
    author: string;
    bookAbstract: string;
    category: string;
    price: string;
};

export const sampleItems: GridItem[] = [
    {
        number: 1,
        author: 'GEORGE ORWELL',
        bookAbstract: 'A dystopian social science fiction novel and cautionary tale. The novel is set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance and public manipulation.',
        category: 'FICTION',
        price: '$12.99'
    },
    {
        number: 2,
        author: 'J.R.R. TOLKIEN',
        bookAbstract: 'An epic high-fantasy novel about a hobbit, Frodo Baggins, who inherits the One Ring from his cousin Bilbo and must destroy it in the fires of Mount Doom.',
        category: 'FANTASY',
        price: '$15.99'
    },
    {
        number: 3,
        author: 'HARPER LEE',
        bookAbstract: 'A story of racial injustice and the loss of innocence in the American South. The novel is renowned for its warmth and humor, despite dealing with serious issues of rape and racial inequality.',
        category: 'DRAMA',
        price: '$11.99'
    },
    {
        number: 4,
        author: 'F. SCOTT FITZGERALD',
        bookAbstract: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan. The novel explores themes of decadence, idealism, resistance to change, and excess.',
        category: 'ROMANCE',
        price: '$13.99'
    },
    {
        number: 5,
        author: 'JANE AUSTEN',
        bookAbstract: 'A romantic novel of manners that follows the emotional development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
        category: 'CLASSIC',
        price: '$10.99'
    },
    {
        number: 6,
        author: 'ERNEST HEMINGWAY',
        bookAbstract: 'A novel about a young American and an English girl\'s romance in Civil War-torn Spain. The novel explores themes of love and war, with the backdrop of the Spanish Civil War.',
        category: 'WAR',
        price: '$14.99'
    }
];




