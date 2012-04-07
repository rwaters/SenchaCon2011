Ext.onReady(function() {
    Ext.create('Ext.grid.Panel', {
        renderTo: document.body,
        height: 300,
        width: 500,
        store: Ext.create('Ext.data.Store', {
            fields: ['firstname', 'lastname', 'company', 'twitter', 'session'],
            data: Demo.sampleData
        }),
        columns: [{
            text: 'First Name',
            dataIndex: 'firstname'
        }, {
            text: 'Last Name',
            dataIndex: 'lastname'
        }, {
            xtype: 'multisorttemplatecolumn',
            flex: 1,
            dataIndex: 'company',
            text: [{
                name: 'Company',
                dataIndex: 'company'
            }, {
                name: 'Twitter',
                dataIndex: 'twitter'
            }, {
                name: 'Session',
                dataIndex: 'session'
            }],
            tpl: ['{company}<br/>', '<tpl if="twitter">', '<a href="http://twitter.com/{twitter}">http://twitter.com/{twitter}</a><br/>', '</tpl>', '{session}']
        }]
    });
});

Demo = {
    sampleData: [{
        firstname: 'Aaron',
        lastname: 'Conran',
        company: 'Sencha',
        twitter: 'aconran',
        session: 'Building Touch Apps with Designer'
    }, {
        firstname: 'Jamie',
        lastname: 'Avins',
        company: 'Sencha',
        twitter: 'jamieavins',
        session: 'Migrating from Touch 1.x to 2.0'
    }, {
        firstname: 'Rich',
        lastname: 'Waters',
        company: 'Extnd LLC',
        twitter: 'rwaters',
        session: 'Ext JS 4: Advanced Expert Techniques'
    }, {
        firstname: 'Ariya',
        lastname: 'Hidayat',
        company: 'Sencha',
        twitter: 'ariyahidayat',
        session: 'Hacking WebKit & Its JavaScript Engines'
    }, {
        firstname: 'Ashvin',
        lastname: 'Radiya',
        company: 'Avantsoft Inc.',
        twitter: '',
        session: 'Community Code: Pega'
    }, {
        firstname: 'Cyrus',
        lastname: 'Mistry',
        company: 'Google',
        twitter: 'mistrycy',
        session: 'Keynote'
    }, {
        firstname: 'Jay',
        lastname: 'Garcia',
        company: 'Modus Create',
        twitter: '_jdg',
        session: 'Community Code: The SenchaCon App'
    }]
};
