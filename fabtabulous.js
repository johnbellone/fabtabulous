/*
 * Fabtabulous! Simple tabs using Prototype
 * http://tetlaw.id.au/view/blog/fabtabulous-simple-tabs-using-prototype/
 * Andrew Tetlaw
 * version 1.1 2006-05-06
 * http://creativecommons.org/licenses/by-sa/2.5/
 * Modifications by John Bellone (http://github.com/johnbellone/fabtabulous)
 */

var Fabtabs = Class.create();

Fabtabs.prototype = {
    initialize : function(element, activeBodyClassName, activeTabClassName) {
        activeBodyClassName = typeof(activeBodyClassName) != 'undefined' ? activeBodyClassName : "active-tab-body";
        activeTabClassName = typeof(activeTabClassName) != 'undefined' ? activeTabClassName : "active-tab";

	this.element = $(element);
        this.activeBodyClassName = activeBodyClassName;
        this.activeTabClassName = activeTabClassName;
	var options = Object.extend({}, arguments[1] || {});
	this.menu = $A(this.element.getElementsByTagName('a'));
	this.show(this.getInitialTab());
	this.menu.each(this.setupTab.bind(this));
    },
    setupTab : function(elm) {
	Event.observe(elm,'click',this.activate.bindAsEventListener(this),false)
    },
    activate :  function(ev) {
	var elm = Event.findElement(ev, "a");
	Event.stop(ev);
	this.show(elm);
	this.menu.without(elm).each(this.hide.bind(this));
    },
    hide : function(elm) {
	$(elm).removeClassName(this.activeTabClassName);
	$(this.tabID(elm)).removeClassName(this.activeBodyClassName);
    },
    show : function(elm) {
	$(elm).addClassName(this.activeTabClassName);
	$(this.tabID(elm)).addClassName(this.activeBodyClassName);

    },
    tabID : function(elm) {
	return elm.href.match(/#(\w.+)/)[1];
    },
    getInitialTab : function() {
	if(document.location.href.match(/#(\w.+)/)) {
	    var loc = RegExp.$1;
	    var elm = this.menu.find(function(value) { return value.href.match(/#(\w.+)/)[1] == loc; });
	    return elm || this.menu.first();
	} else {
	    return this.menu.first();
	}
    }
}
