Ext.define('Ext.ux.grid.column.MultiSortTemplateColumn', {
    extend: 'Ext.grid.column.Template',
    alias: 'widget.multisorttemplatecolumn',

    /** Customized template column to support multiple headers where each can still click to sort.
     *  now expects the text property to be an array of objects:
     *  text: [{
     *      name: 'Header 1',
     *      dataIndex: 'field1'
     *  }, {
     *      name: 'Header 2',
     *      dataIndex: 'field2'
     *  }]
     */
    initComponent: function() {
        var me = this;
        me.renderTpl = [
            '<div class="' + Ext.baseCSSPrefix + 'column-header-inner">', 
                '<tpl for="text">', 
                    '<span class="', 
                    '<tpl if="this.getDataIndex()==dataIndex">', 
                        Ext.baseCSSPrefix + 'column-header-text', 
                    '</tpl>', 
                    ' column-sort-text', 
                    '<tpl if="extraCls">', 
                        ' {extraCls}', 
                    '</tpl>', 
                    '" sortOn="{dataIndex}">', 
                        '{name}', 
                    '</span><br/>', 
                '</tpl>', 
                '<tpl if="!values.menuDisabled"><div class="' + Ext.baseCSSPrefix + 'column-header-trigger"></div></tpl>', 
            '</div>',
        {
            getDataIndex: function() {
                return me.dataIndex;
            }
        }];

        Ext.applyIf(me.renderSelectors, {
            titleContainer: '.' + Ext.baseCSSPrefix + 'column-header-inner',
            triggerEl: '.' + Ext.baseCSSPrefix + 'column-header-trigger',
            textEl: '.' + Ext.baseCSSPrefix + 'column-header-text'
        });

        me.callParent();
        // remove all childEls, we will use renderSelectors instead since we need multiples and don't want to deal with ID mess
        // this is used as a 'filter' style func, returning false always will strip all
        me.removeChildEls(function() {
            return false;
        });
    },

    onElClick: function(e, t) {
        // The grid's docked HeaderContainer.
        var me            = this,
            ownerHeaderCt = me.getOwnerHeaderCt();

        if (ownerHeaderCt && !ownerHeaderCt.ddLock) {
            // Firefox doesn't check the current target in a within check.
            // Therefore we check the target directly and then within (ancestors)
            if (me.triggerEl && (e.target === me.triggerEl.dom || t === me.triggerEl.dom || e.within(me.triggerEl))) {
                ownerHeaderCt.onHeaderTriggerClick(me, e, t);
                // if its not on the left hand edge, sort
            } else if (e.getKey() || (!me.isOnLeftEdge(e) && !me.isOnRightEdge(e))) {

                var sort = e.getTarget('span.column-sort-text');
                if (sort) {
                    me.dataIndex = sort.attributes.sortOn.value;
                    Ext.fly(sort).radioCls(Ext.baseCSSPrefix + 'column-header-text');
                }

                me.toggleSortState();
                ownerHeaderCt.onHeaderClick(me, e, t);
            }
        }
    },

    // Override to remove excess top padding, rest is the same
    setPadding: function(headerHeight) {
        var me         = this,
            lineHeight = Ext.util.TextMetrics.measure(me.textEl.dom, me.text).height;


        if (!me.isGroupHeader) {
            if (me.titleContainer.getHeight() < headerHeight) {
                me.titleContainer.dom.style.height = headerHeight + 'px';
            }
        }
        headerHeight = me.titleContainer.getViewSize().height;

        // scrap the top padding as we need room
        // if (lineHeight) {
        //     me.titleContainer.setStyle({
        //         paddingTop: Math.max(((headerHeight - lineHeight) / 2), 0) + 'px'
        //     });
        // }
        if (Ext.isIE && me.triggerEl) {
            me.triggerEl.setHeight(headerHeight);
        }
    },
});
