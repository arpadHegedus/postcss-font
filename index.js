/**
 * POSTCSS FONT
 * A postcss plugin to add font related properties in one line
 * version          1.0.3
 * author           Arpad Hegedus <hegedus.arpad@gmail.com>
 */

// load dependencies
let postcss         =   require('postcss'),
    util            =   require('postcss-plugin-utilities');

// export plugin
module.exports = postcss.plugin('postcss-font', options => {
    return css => {
        css.walkDecls('font', decl => {
            let parent = decl.parent;
            if (!util.isRegex(decl.value, /((normal|italic|oblique)[\s]+)?((normal|small-caps|initial|inherit)[\s]+)?([0-9]+(px|cm|mm|%|ch|pica|in|em|rem|pt|pc|ex|vw|vh|vmin|vmax)(([\s]+)?\/([\s]+)?[0-9]+(px|cm|mm|%|ch|pica|in|em|rem|pt|pc|ex|vw|vh|vmin|vmax)?)?)[\s]+((normal|bold|bolder|lighter|number|initial|inherit)[\s]+)?(?![0-9]).+/ig) && decl.value !== 'inherit' && decl.value !== 'initial') {
                let declVal = (decl.value.match(/(?!\B(\(\")[^\"\(\)]*),(?![^\"\(\)]*(\)|\")\B)/ig) === null)? postcss.list.space(decl.value) : postcss.list.comma(decl.value);
                    value = util.filterObject(declVal, {
                    'font-size':        [util.isSize],
                    'font-style':       ['normal', 'italic', 'oblique', 'initial', 'inherit'],
                    'font-weight':      ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'bolder', 'lighter', 'initial', 'inherit'],
                    'line-height':      [util.isSize, util.isNumber],
                    'text-align':       ['left', 'right', 'center', 'justify', 'initial', 'inherit'],
                    'font-variant':     ['normal', 'small-caps', 'initial', 'inherit'],
                    'color':            [util.isColor],
                    'text-decoration':  ['none', 'underline', 'overline', 'line-through', 'initial', 'inherit'],
                    'text-transform':   ['none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit'],
                    'vertical-align':   ['baseline', 'isSize', 'isSizeNegative', 'sub', 'sup', 'super', 'top', 'text-top', 'middle', 'bottom', 'text-bottom', 'initial', 'inherit'],
                    'font-family':      [(v) => { if( util.isNumber(v) || util.isSize(v) || util.isColor(v) || ['normal', 'break-word', 'initial', 'inherit', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'ltr', 'rtl', 'embed', 'bidi-override'].indexOf(v) >= 0 ) { return false; } return true; }],
                    'word-wrap':        ['normal', 'break-word', 'initial', 'inherit'],
                    'letter-spacing':   [util.isSize, 'normal', 'initial', 'inherit'],
                    'word-spacing':     [util.isSize, 'normal', 'initial', 'inherit'],
                    'text-indent':      [util.isSize, 'initial', 'inherit'],
                    'white-space':      ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'initial', 'inherit'],
                    'font-stretch':     ['normal', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', '', 'unset', 'initial', 'inherit'],
                    'direction':        ['ltr', 'rtl', 'initial', 'inherit'],
                    'unicode-bidi':     ['normal', 'embed', 'bidi-override', 'initial', 'inherit']
                });
                if(value['font-family']) { value['font-family'] = postcss.list.space(value['font-family']).join(', '); }
                for(let [prop, val] of Object.entries(value)) {
                    decl.before({ prop: prop, value: val });
                }
                decl.remove();
                if(parent.nodes.length === 0) {
                    parent.remove();
                }
            }
        });
    }
});
