
/*
 * Configuration options for Aldo.
 */

conf = {
    fbAppID: '319585755122078',
    perms: [
        {
            name: 'manage_pages',
            required: true,
            desc: "Zugriff auf deine Seiten erlauben",
        },
        {
            name: 'publish_pages',
            required: true,
            desc: "Im Namen deiner Seiten posten",
            msg: "für deine zu Seiten posten, liken und kommentieren."
        }
    ]
};

