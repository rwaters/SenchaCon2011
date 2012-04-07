/*
 * Rewrite to utilize renderTpl, renderData, childEl,
 * afterRenderEvents using mon & event delegation, qtips
 */
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    Ext.create('Ext.form.Panel', {
        height: 200,
        width: 300,
        renderTo: document.body,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldwrapper',
            id: 'wrapper1',
            items: [{
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Demo Field',
                value: 'val'
            }],
            renderData: {
                sectionLabel: 'Label From renderData'
            }
        }, {
            xtype: 'fieldwrapper',
            id: 'wrapper2',
            items: [{
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Demo Field 2',
                value: 'Something important!'
            }]
        }]
    });

    // Ext.getCmp('wrapper1').setLabel('Label 1');
    Ext.getCmp('wrapper2').setLabel('Another Label!');
});


Ext.define('Demo.FieldWrapper', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.fieldwrapper',
    baseCls: 'transparent-panel',
    height: 60,
    padding: '0 0 11 0',
    bodyPadding: '20 0 0 5',
    margin: 5,

    initComponent: function() {
        var me        = this,
            renderTpl = me.renderTpl;
        /*
        steal built in default renderTpl from abstractPanel and prepend/append extra html
        '<div id="{id}-body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>',
            ' {baseCls}-body-{ui}<tpl if="uiCls">',
                '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
            '</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
        '</div>',
        */
        me.renderTpl = [
            '<div id="{id}-panelLabelEl" class="section-label">{sectionLabel}</div>', 
                '<img src="close.png" action="delete" class="delete" data-qtip="Delete this section" data-qwidth="100"/>', 
                '<img src="duplicate.png" action="duplicate" class="duplicate" data-qtip="Duplicate this section" data-qwidth="120"/>' + renderTpl.html
        ];

        me.renderTpl.push('<img src="down.png" action="down" class="down" data-qtip="Move this section down" data-qwidth="125"/>');
        me.renderTpl.push('<img src="up.png" action="up" class="up" data-qtip="Move this section up" data-qwidth="110" />');

        me.addChildEls('panelLabelEl');

        me.afterRenderEvents = {
            el: {
                click: {
                    fn: function(e, t) {
                        var action = t.attributes.action.value;
                        me['on' + action.charAt(0).toUpperCase() + action.substring(1)]();
                    },
                    delegate: 'img[action]'
                }
            }
        };

        me.callParent();
    },

    onDuplicate: function() {
        console.log('duplicate');
        // duplicate component and insert another sibling
    },

    onDelete: function() {
        console.log('delete');
        // destroy & remove component
    },

    onUp: function() {
        console.log('move up');
        // remove/insert above previous sibling
        // toggle state of buttons if needed
    },

    onDown: function() {
        console.log('move down');
        // remove/insert below next sibling
        // toggle state of buttons if needed
    },

    setLabel: function(label) {
        this.panelLabelEl.update(label);
    }
});
