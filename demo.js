/*
 * Initial implementation, uses many nested panels, 
 * several dom event handlers(potential leak), individual tooltips
 */
Ext.onReady(function(){
    Ext.create('Ext.form.Panel',{
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
            }]
        },{
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
    Ext.getCmp('wrapper1').setLabel('Label 1');
    Ext.getCmp('wrapper1').setLabel('Another Label!');
});


Ext.define('Demo.FieldWrapper',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.fieldwrapper',
    baseCls: 'transparent-panel',
    height: 60,
    padding: '0 3 3 0',
    bodyPadding: '20 0 0 5',
    margin: 5,
    
    initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            border: false,
            baseCls: 'transparent-toolbar',
            dock: 'top',
            defaults: {
                baseCls: 'transparent'
            },
            items: [{
                html: '<div class="section-label">Section Label</div>'
            },'->',{
                html: '<img src="duplicate.png" action="duplicate"/>'
            },{
                html: '<img src="close.png" action="delete" />'
            }]
        },{
            xtype: 'toolbar',
            border: false,
            baseCls: 'transparent-toolbar',
            dock: 'bottom',
            defaults: {
                baseCls: 'transparent'
            },
            items: ['->',{
                html: '<img src="up.png" action="up" />'
            },{
                html: '<img src="down.png" action="down" />'
            }]
        }];
        
        this.on('afterrender', function() {
            var el = this.getEl();
            var dup = el.down('img[action="duplicate"]'),
                del = el.down('img[action="delete"]'),
                up = el.down('img[action="up"]'),
                down = el.down('img[action="down"]');
            dup.on('click', this.onDuplicate, this);
            Ext.create('Ext.tip.ToolTip', {
                width: 120,
                target: dup,
                html: 'Duplicate this section'
            });
            del.on('click', this.onDelete, this);
            Ext.create('Ext.tip.ToolTip', {
                width: 100,
                target: del,
                html: 'Delete this section'
            });
            up.on('click', this.moveUp, this);
            Ext.create('Ext.tip.ToolTip', {
                width: 110,
                target: up,
                html: 'Move this section up'
            });
            down.on('click', this.moveDown, this);
            Ext.create('Ext.tip.ToolTip', {
                width: 125,
                target: down,
                html: 'Move this section down'
            });
            
            this.sectionLabel = el.down('div.section-label');
        }, this);
        this.callParent();
    },
    
    onDuplicate: function() {
        console.log('duplicate');
        // duplicate component and insert another sibling
    },
    
    onDelete: function() {
        console.log('delete');
        // destroy & remove component
    },
    
    moveUp: function() {
        console.log('move up');
        // remove/insert above previous sibling
        // toggle state of buttons if needed
    },
    
    moveDown: function() {
        console.log('move down');
        // remove/insert below next sibling
        // toggle state of buttons if needed
    },
    
    setLabel: function(label) {
        this.sectionLabel.update(label);
    }
});
