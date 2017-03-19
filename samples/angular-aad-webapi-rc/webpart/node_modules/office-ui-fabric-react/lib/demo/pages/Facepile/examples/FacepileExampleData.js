"use strict";
var index_1 = require('../../../../index');
exports.facepilePersonas = [
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'PV',
        personaName: 'Annie Lindqvist',
        initialsColor: index_1.PersonaInitialsColor.blue,
        data: '50%'
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'AR',
        personaName: 'Aaron Reid',
        initialsColor: index_1.PersonaInitialsColor.darkBlue,
        data: '$1,000'
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'AL',
        personaName: 'Alex Lundberg',
        initialsColor: index_1.PersonaInitialsColor.darkGreen,
        data: '75%',
        onClick: function (ev, persona) {
            return alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data);
        }
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'RK',
        personaName: 'Roko Kolar',
        initialsColor: index_1.PersonaInitialsColor.darkRed,
        data: '4 hrs'
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'CB',
        personaName: 'Christian Bergqvist',
        initialsColor: index_1.PersonaInitialsColor.green,
        data: '25%'
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Valentina Lovric',
        initialsColor: index_1.PersonaInitialsColor.lightBlue,
        data: 'Emp1234',
        onClick: function (ev, persona) {
            return alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data);
        }
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Maor Sharett',
        initialsColor: index_1.PersonaInitialsColor.lightGreen
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'PV',
        personaName: 'Annie Lindqvist2',
        initialsColor: index_1.PersonaInitialsColor.lightPink
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'AR',
        personaName: 'Aaron Reid2',
        initialsColor: index_1.PersonaInitialsColor.magenta,
        data: 'Emp1234',
        onClick: function (ev, persona) {
            return alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data);
        }
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'AL',
        personaName: 'Alex Lundberg2',
        initialsColor: index_1.PersonaInitialsColor.orange
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'RK',
        personaName: 'Roko Kolar2',
        initialsColor: index_1.PersonaInitialsColor.pink
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'CB',
        personaName: 'Christian Bergqvist2',
        initialsColor: index_1.PersonaInitialsColor.purple
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Valentina Lovric2',
        initialsColor: index_1.PersonaInitialsColor.red
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Maor Sharett2',
        initialsColor: index_1.PersonaInitialsColor.teal
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Another A Name',
        initialsColor: index_1.PersonaInitialsColor.blue
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Another A Name (So Many A names!)',
        initialsColor: index_1.PersonaInitialsColor.darkBlue
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Another Anecdotal A Name',
        initialsColor: index_1.PersonaInitialsColor.darkGreen
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Anerobic A Name',
        initialsColor: index_1.PersonaInitialsColor.darkRed
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Aerobic A Name',
        initialsColor: index_1.PersonaInitialsColor.green
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Maor Sharett2',
        initialsColor: index_1.PersonaInitialsColor.lightBlue
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Valentina Lovric2',
        initialsColor: index_1.PersonaInitialsColor.lightGreen
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Maor Sharett2',
        initialsColor: index_1.PersonaInitialsColor.lightPink
    },
    {
        imageUrl: './images/persona-female.png',
        imageInitials: 'VL',
        personaName: 'Valentina Lovric2',
        initialsColor: index_1.PersonaInitialsColor.magenta
    },
    {
        imageUrl: './images/persona-male.png',
        imageInitials: 'MS',
        personaName: 'Maor Sharett2',
        initialsColor: index_1.PersonaInitialsColor.orange
    },
];

//# sourceMappingURL=FacepileExampleData.js.map
