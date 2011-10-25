/*
 * Showing off Ext.util.TextMetrics to calculate width for tips & 
 * moved tip text into renderData for i18n support
 */
Ext.onReady(function(){
    Ext.tip.QuickTipManager.init();
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
            }],
            renderData: {
                sectionLabel: 'Label From renderData',
                deleteSectionTip: 'Delete this section',
                duplicateSectionTip: 'Duplicate this section',
                moveDownTip: 'Move this section down',
                moveUpTip: 'Move this section asdf asdfasdf'
            }
        },{
            xtype: 'fieldwrapper',
            id: 'wrapper2',
            items: [{
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Demo Field 2',
                value: 'Something important!'
            }],
            renderData: {
                sectionLabel: 'Label From renderData that will be overwritten',
                deleteSectionTip: 'Delete this section',
                duplicateSectionTip: 'Duplicate this section',
                moveDownTip: 'Move this section down',
                moveUpTip: 'Move this section up'
            }
        }]
    });
    
    // Ext.getCmp('wrapper1').setLabel('Label 1');
    Ext.getCmp('wrapper2').setLabel('Another Label!');
});


Ext.define('Demo.FieldWrapper',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.fieldwrapper',
    baseCls: 'transparent-panel',
    height: 60,
    padding: '0 0 11 0',
    bodyPadding: '20 0 0 5',
    margin: 5,
    
    initComponent: function() {
        var renderTpl = this.renderTpl;
        /*
        steal built in default renderTpl from abstractPanel and prepend/append extra html
        '<div id="{id}-body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>',
            ' {baseCls}-body-{ui}<tpl if="uiCls">',
                '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
            '</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
        '</div>',
        */
        this.renderTpl = ['<div id="{id}-panelLabelEl" class="section-label">{sectionLabel}</div>',
        '<img src="close.png" action="delete" class="delete" data-qtip="{deleteSectionTip}" data-qwidth="{deleteSectionTip:this.measureTipWidth}"/>',
        '<img src="duplicate.png" action="duplicate" class="duplicate" data-qtip="{duplicateSectionTip}" data-qwidth="{duplicateSectionTip:this.measureTipWidth}"/>' + renderTpl.html];
        
        this.renderTpl.push('<img src="down.png" action="down" class="down" data-qtip="{moveDownTip}" data-qwidth="{moveDownTip:this.measureTipWidth}"/>');
        this.renderTpl.push('<img src="up.png" action="up" class="up" data-qtip="{moveUpTip}" data-qwidth="{moveUpTip:this.measureTipWidth}" />');
        this.renderTpl.push({
            measureTipWidth: function(text) {
                if (!this.tipEl) {
                    this.tipEl = Ext.DomQuery.selectNode('div.x-tip-body-default');
                }
                if (!this.textMetrics) {
                    this.textMetrics = Ext.create('Ext.util.TextMetrics', this.tipEl);
                }
                return this.textMetrics.getWidth(text)+2; // just a touch off with padding on smaller text, winds up wrapping
            }
        });
        
        this.addChildEls('panelLabelEl');
        
        this.afterRenderEvents = {
            el: {
                click: {
                    fn: function(e, t) {
                        var action = t.attributes.action.value,
                            action = action.charAt(0).toUpperCase() + action.substring(1);
                        this['on'+action]();
                    },
                    scope: this,
                    delegate: 'img[action]'
                }
            }
        };

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
