const chapters = [
    {
        "chapter_number": 1,
        "chapter_title": "The Riddle House",
        "description":"Harry Potter is spending the summer with the Dursleys when he's unexpectedly summoned to the Weasleys' home, the Burrow, to attend the Quidditch World Cup.",
    },
    {
        "chapter_number": 2,
        "chapter_title": "The Scar",
        "description":"Harry and the Weasleys attend the Quidditch World Cup, but the event is marred by Death Eater attacks and chaos.",
    },
    {
        "chapter_number": 3,
        "chapter_title": "The Invitation",
        "description":"Harry returns to the Dursleys and receives an unexpected invitation to the Quidditch World Cup from a house-elf named Dobby.",
    },
    {
        "chapter_number": 4,
        "chapter_title": "Back to the Burrow",
        "description":"The Weasleys rescue Harry from the Dursleys, and he returns to the Burrow to prepare for his fourth year at Hogwarts.",
    },
    {
        "chapter_number": 5,
        "chapter_title": "Weasley's Wizard Wheezes",
        "description":"The Weasley twins introduce their joke shop, Weasley's Wizard Wheezes, to Harry, and they discuss the Triwizard Tournament.",
    },
    {
        "chapter_number": 6,
        "chapter_title": "The Portkey",
        "description":"Harry and the Weasleys travel to the Quidditch World Cup site using a Portkey and witness the magical event.",
    },
    {
        "chapter_number": 7,
        "chapter_title": "Bagman and Crouch",
        "description":"At the Quidditch World Cup, Harry meets former Quidditch star Ludo Bagman and Ministry official Barty Crouch.",
    },
    {
        "chapter_number": 8,
        "chapter_title": "The Quidditch World Cup",
        "description":"The Quidditch World Cup is filled with excitement, but it takes a dark turn when Death Eaters attack the campsite.",
    },
    {
        "chapter_number": 9,
        "chapter_title": "The Dark Mark",
        "description":"After the attack at the Quidditch World Cup, Harry and his friends encounter the Dark Mark, a sign of Voldemort's return.",
    },
    {
        "chapter_number": 10,
        "chapter_title": "Mayhem at the Ministry",
        "description":"Harry and Mr. Weasley are summoned to the Ministry of Magic for questioning about the Dark Mark, leading to chaos.",
    },
    {
        "chapter_number": 11,
        "chapter_title": "Aboard the Hogwarts Express",
        "description":"Harry returns to Hogwarts and meets new Defense Against the Dark Arts professor, Mad-Eye Moody.",
    },
    {
        "chapter_number": 12,
        "chapter_title": "The Triwizard Tournament",
        "description":"Hogwarts is hosting the Triwizard Tournament, and Harry is unexpectedly selected as one of the champions.",
    },
    {
        "chapter_number": 13,
        "chapter_title": "Mad-Eye Moody",
        "description":"Harry starts his Triwizard Tournament training with Mad-Eye Moody, who teaches him valuable skills.",
    },
    {
        "chapter_number": 14,
        "chapter_title": "The Unforgivable Curses",
        "description":"Mad-Eye Moody demonstrates the Unforgivable Curses to the students, showing the dark side of magic.",
    },
    {
        "chapter_number": 15,
        "chapter_title": "Beauxbatons and Durmstrang",
        "description":"Beauxbatons and Durmstrang students arrive at Hogwarts for the Triwizard Tournament, leading to excitement and curiosity.",
    },
    {
        "chapter_number": 16,
        "chapter_title": "The Goblet of Fire",
        "description":"The magical Goblet of Fire selects the champions for the Triwizard Tournament, including Harry.",
    },
    {
        "chapter_number": 17,
        "chapter_title": "The Four Champions",
        "description":"Harry, along with the other champions, faces various challenges and obstacles as the tournament begins.",
    },
    {
        "chapter_number": 18,
        "chapter_title": "The Weighing of the Wands",
        "description":"The champions' wands are examined as part of the Triwizard Tournament preparations, revealing important information.",
    },
    {
        "chapter_number": 19,
        "chapter_title": "The Hungarian Horntail",
        "description":"Harry faces a dangerous dragon as one of the tasks in the Triwizard Tournament.",
    },
    {
        "chapter_number": 20,
        "chapter_title": "The First Task",
        "description":"The First Task of the Triwizard Tournament takes place, involving dragons, and Harry earns high praise.",
    },
    {
        "chapter_number": 21,
        "chapter_title": "The House-Elf Liberation Front",
        "description":"Hermione starts an organization advocating for the rights of house-elves, leading to tensions among the trio.",
    },
    {
        "chapter_number": 22,
        "chapter_title": "The Unexpected Task",
        "description":"Harry faces the unexpected challenge of the Yule Ball, leading to social and romantic complications.",
    },
    {
        "chapter_number": 23,
        "chapter_title": "The Yule Ball",
        "description":"The Yule Ball takes place, and Harry and his friends navigate the intricacies of the magical social event.",
    },
    {
        "chapter_number": 24,
        "chapter_title": "Rita Skeeter's Scoop",
        "description":"Rita Skeeter, a sensationalist journalist, publishes an unauthorized article about Harry, causing a stir.",
    },
    {
        "chapter_number": 25,
        "chapter_title": "The Egg and the Eye",
        "description":"Harry works to solve the mystery of the golden egg while Moody provides him with crucial advice.",
    },
    {
        "chapter_number": 26,
        "chapter_title": "The Second Task",
        "description":"The Second Task of the Triwizard Tournament involves underwater challenges, and Harry faces it with determination.",
    },
    {
        "chapter_number": 27,
        "chapter_title": "Padfoot Returns",
        "description":"Sirius Black, known as Padfoot, returns to offer Harry advice and guidance during the tournament.",
    },
    {
        "chapter_number": 28,
        "chapter_title": "The Madness of Mr. Crouch",
        "description":"Barty Crouch's strange behavior raises questions as the Triwizard Tournament continues.",
    },
    {
        "chapter_number": 29,
        "chapter_title": "The Dream",
        "description":"Harry has a disturbing dream that provides a glimpse into Voldemort's plans.",
    },
    {
        "chapter_number": 30,
        "chapter_title": "The Pensieve",
        "description":"Harry and Dumbledore use a Pensieve to explore memories related to Voldemort and the Death Eaters.",
    },
    {
        "chapter_number": 31,
        "chapter_title": "The Third Task",
        "description":"The Third Task of the Triwizard Tournament takes place in the maze, leading to a dramatic conclusion.",
    },
    {
        "chapter_number": 32,
        "chapter_title": "Flesh, Blood, and Bone",
        "description":"The final challenge reveals dark secrets and leads to the resurrection of Voldemort.",
    },
    {
        "chapter_number": 33,
        "chapter_title": "The Death Eaters",
        "description":"Voldemort and his Death Eaters return to full power, leading to chaos and danger at Hogwarts.",
    },
    {
        "chapter_number": 34,
        "chapter_title": "Priori Incantatem",
        "description":"Harry and Voldemort engage in a fierce duel, resulting in a magical phenomenon known as Priori Incantatem.",
    },
    {
        "chapter_number": 35,
        "chapter_title": "Veritaserum",
        "description":"Barty Crouch Jr. is exposed, and the truth about his actions and plans comes to light.",
    },
    {
        "chapter_number": 36,
        "chapter_title": "The Parting of the Ways",
        "description":"The consequences of the Triwizard Tournament and the return of Voldemort lead to significant changes.",
    },
    {
        "chapter_number": 37,
        "chapter_title": "The Beginning",
        "description":"The book concludes with Harry and his friends looking toward the future as they prepare for what lies ahead.",
    },
];

export default chapters;
