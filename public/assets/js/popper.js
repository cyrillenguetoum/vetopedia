var isBrowser="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator;const timeoutDuration=function(){var longerTimeoutBrowsers=["Edge","Trident","Firefox"];for(let i=0;i<longerTimeoutBrowsers.length;i+=1)if(isBrowser&&0<=navigator.userAgent.indexOf(longerTimeoutBrowsers[i]))return 1;return 0}();function microtaskDebounce(fn){let called=!1;return()=>{called||(called=!0,window.Promise.resolve().then(()=>{called=!1,fn()}))}}function taskDebounce(fn){let scheduled=!1;return()=>{scheduled||(scheduled=!0,setTimeout(()=>{scheduled=!1,fn()},timeoutDuration))}}const supportsMicroTasks=isBrowser&&window.Promise;var debounce=supportsMicroTasks?microtaskDebounce:taskDebounce;function isFunction(functionToCheck){return functionToCheck&&"[object Function]"==={}.toString.call(functionToCheck)}function getStyleComputedProperty(element,property){return 1!==element.nodeType?[]:(element=element.ownerDocument.defaultView.getComputedStyle(element,null),property?element[property]:element)}function getParentNode(element){return"HTML"===element.nodeName?element:element.parentNode||element.host}function getScrollParent(element){if(!element)return document.body;switch(element.nodeName){case"HTML":case"BODY":return element.ownerDocument.body;case"#document":return element.body}var{overflow,overflowX,overflowY}=getStyleComputedProperty(element);return/(auto|scroll|overlay)/.test(overflow+overflowY+overflowX)?element:getScrollParent(getParentNode(element))}function getReferenceNode(reference){return reference&&reference.referenceNode?reference.referenceNode:reference}const isIE11=isBrowser&&!(!window.MSInputMethodContext||!document.documentMode),isIE10=isBrowser&&/MSIE 10/.test(navigator.userAgent);function isIE(version){return 11===version?isIE11:10!==version&&isIE11||isIE10}function getOffsetParent(element){if(!element)return document.documentElement;var noOffsetParent=isIE(10)?document.body:null;let offsetParent=element.offsetParent||null;for(;offsetParent===noOffsetParent&&element.nextElementSibling;)offsetParent=(element=element.nextElementSibling).offsetParent;var nodeName=offsetParent&&offsetParent.nodeName;return nodeName&&"BODY"!==nodeName&&"HTML"!==nodeName?-1!==["TH","TD","TABLE"].indexOf(offsetParent.nodeName)&&"static"===getStyleComputedProperty(offsetParent,"position")?getOffsetParent(offsetParent):offsetParent:(element?element.ownerDocument:document).documentElement}function isOffsetContainer(element){var nodeName=element["nodeName"];return"BODY"!==nodeName&&("HTML"===nodeName||getOffsetParent(element.firstElementChild)===element)}function getRoot(node){return null!==node.parentNode?getRoot(node.parentNode):node}function findCommonOffsetParent(element1,element2){var order,range,start;return element1&&element1.nodeType&&element2&&element2.nodeType?(start=(order=element1.compareDocumentPosition(element2)&Node.DOCUMENT_POSITION_FOLLOWING)?element1:element2,order=order?element2:element1,range=((range=document.createRange()).setStart(start,0),range.setEnd(order,0),range)["commonAncestorContainer"],element1!==range&&element2!==range||start.contains(order)?isOffsetContainer(range)?range:getOffsetParent(range):(start=getRoot(element1)).host?findCommonOffsetParent(start.host,element2):findCommonOffsetParent(element1,getRoot(element2).host)):document.documentElement}function getScroll(element,side="top"){var side="top"===side?"scrollTop":"scrollLeft",nodeName=element.nodeName;return("BODY"===nodeName||"HTML"===nodeName?(nodeName=element.ownerDocument.documentElement,element.ownerDocument.scrollingElement||nodeName):element)[side]}function includeScroll(rect,element,subtract=!1){var scrollTop=getScroll(element,"top"),element=getScroll(element,"left"),subtract=subtract?-1:1;return rect.top+=scrollTop*subtract,rect.bottom+=scrollTop*subtract,rect.left+=element*subtract,rect.right+=element*subtract,rect}function getBordersSize(styles,axis){var axis="x"===axis?"Left":"Top",sideB="Left"==axis?"Right":"Bottom";return parseFloat(styles[`border${axis}Width`])+parseFloat(styles[`border${sideB}Width`])}function getSize(axis,body,html,computedStyle){return Math.max(body["offset"+axis],body["scroll"+axis],html["client"+axis],html["offset"+axis],html["scroll"+axis],isIE(10)?parseInt(html["offset"+axis])+parseInt(computedStyle["margin"+("Height"===axis?"Top":"Left")])+parseInt(computedStyle["margin"+("Height"===axis?"Bottom":"Right")]):0)}function getWindowSizes(document){var body=document.body,document=document.documentElement,computedStyle=isIE(10)&&getComputedStyle(document);return{height:getSize("Height",body,document,computedStyle),width:getSize("Width",body,document,computedStyle)}}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var key,source=arguments[i];for(key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target};function getClientRect(offsets){return _extends({},offsets,{right:offsets.left+offsets.width,bottom:offsets.top+offsets.height})}function getBoundingClientRect(element){let rect={};try{isIE(10)?(rect=element.getBoundingClientRect(),scrollTop=getScroll(element,"top"),scrollLeft=getScroll(element,"left"),rect.top+=scrollTop,rect.left+=scrollLeft,rect.bottom+=scrollTop,rect.right+=scrollLeft):rect=element.getBoundingClientRect()}catch(e){}var scrollTop={left:rect.left,top:rect.top,width:rect.right-rect.left,height:rect.bottom-rect.top},scrollLeft="HTML"===element.nodeName?getWindowSizes(element.ownerDocument):{},width=scrollLeft.width||element.clientWidth||scrollTop.width,scrollLeft=scrollLeft.height||element.clientHeight||scrollTop.height,width=element.offsetWidth-width,scrollLeft=element.offsetHeight-scrollLeft;return(width||scrollLeft)&&(width-=getBordersSize(element=getStyleComputedProperty(element),"x"),scrollLeft-=getBordersSize(element,"y"),scrollTop.width-=width,scrollTop.height-=scrollLeft),getClientRect(scrollTop)}function getOffsetRectRelativeToArbitraryNode(children,parent,fixedPosition=!1){var isIE10=isIE(10),isHTML="HTML"===parent.nodeName,childrenRect=getBoundingClientRect(children),parentRect=getBoundingClientRect(parent),children=getScrollParent(children),styles=getStyleComputedProperty(parent),borderTopWidth=parseFloat(styles.borderTopWidth),borderLeftWidth=parseFloat(styles.borderLeftWidth);fixedPosition&&isHTML&&(parentRect.top=Math.max(parentRect.top,0),parentRect.left=Math.max(parentRect.left,0));let offsets=getClientRect({top:childrenRect.top-parentRect.top-borderTopWidth,left:childrenRect.left-parentRect.left-borderLeftWidth,width:childrenRect.width,height:childrenRect.height});return offsets.marginTop=0,offsets.marginLeft=0,!isIE10&&isHTML&&(parentRect=parseFloat(styles.marginTop),childrenRect=parseFloat(styles.marginLeft),offsets.top-=borderTopWidth-parentRect,offsets.bottom-=borderTopWidth-parentRect,offsets.left-=borderLeftWidth-childrenRect,offsets.right-=borderLeftWidth-childrenRect,offsets.marginTop=parentRect,offsets.marginLeft=childrenRect),offsets=(isIE10&&!fixedPosition?parent.contains(children):parent===children&&"BODY"!==children.nodeName)?includeScroll(offsets,parent):offsets}function getViewportOffsetRectRelativeToArtbitraryNode(element,excludeScroll=!1){var html=element.ownerDocument.documentElement,element=getOffsetRectRelativeToArbitraryNode(element,html),width=Math.max(html.clientWidth,window.innerWidth||0),height=Math.max(html.clientHeight,window.innerHeight||0),scrollTop=excludeScroll?0:getScroll(html),excludeScroll=excludeScroll?0:getScroll(html,"left");return getClientRect({top:scrollTop-element.top+element.marginTop,left:excludeScroll-element.left+element.marginLeft,width:width,height:height})}function isFixed(element){var nodeName=element.nodeName;return"BODY"!==nodeName&&"HTML"!==nodeName&&("fixed"===getStyleComputedProperty(element,"position")||!!(nodeName=getParentNode(element))&&isFixed(nodeName))}function getFixedPositionOffsetParent(element){if(!element||!element.parentElement||isIE())return document.documentElement;let el=element.parentElement;for(;el&&"none"===getStyleComputedProperty(el,"transform");)el=el.parentElement;return el||document.documentElement}function getBoundaries(popper,reference,padding,boundariesElement,fixedPosition=!1){let boundaries={top:0,left:0};var offsetParent=fixedPosition?getFixedPositionOffsetParent(popper):findCommonOffsetParent(popper,getReferenceNode(reference));if("viewport"===boundariesElement)boundaries=getViewportOffsetRectRelativeToArtbitraryNode(offsetParent,fixedPosition);else{let boundariesNode;"scrollParent"===boundariesElement?"BODY"===(boundariesNode=getScrollParent(getParentNode(reference))).nodeName&&(boundariesNode=popper.ownerDocument.documentElement):boundariesNode="window"===boundariesElement?popper.ownerDocument.documentElement:boundariesElement;reference=getOffsetRectRelativeToArbitraryNode(boundariesNode,offsetParent,fixedPosition);"HTML"!==boundariesNode.nodeName||isFixed(offsetParent)?boundaries=reference:({height:boundariesElement,width:fixedPosition}=getWindowSizes(popper.ownerDocument),boundaries.top+=reference.top-reference.marginTop,boundaries.bottom=boundariesElement+reference.top,boundaries.left+=reference.left-reference.marginLeft,boundaries.right=fixedPosition+reference.left)}offsetParent="number"==typeof(padding=padding||0);return boundaries.left+=offsetParent?padding:padding.left||0,boundaries.top+=offsetParent?padding:padding.top||0,boundaries.right-=offsetParent?padding:padding.right||0,boundaries.bottom-=offsetParent?padding:padding.bottom||0,boundaries}function getArea({width,height}){return width*height}function computeAutoPlacement(placement,refRect,popper,reference,boundariesElement,padding=0){if(-1===placement.indexOf("auto"))return placement;reference=getBoundaries(popper,reference,padding,boundariesElement);const rects={top:{width:reference.width,height:refRect.top-reference.top},right:{width:reference.right-refRect.right,height:reference.height},bottom:{width:reference.width,height:reference.bottom-refRect.bottom},left:{width:refRect.left-reference.left,height:reference.height}};padding=Object.keys(rects).map(key=>_extends({key:key},rects[key],{area:getArea(rects[key])})).sort((a,b)=>b.area-a.area),boundariesElement=padding.filter(({width,height})=>width>=popper.clientWidth&&height>=popper.clientHeight),refRect=(0<boundariesElement.length?boundariesElement:padding)[0].key,reference=placement.split("-")[1];return refRect+(reference?"-"+reference:"")}function getReferenceOffsets(state,popper,reference,fixedPosition=null){return getOffsetRectRelativeToArbitraryNode(reference,fixedPosition?getFixedPositionOffsetParent(popper):findCommonOffsetParent(popper,getReferenceNode(reference)),fixedPosition)}function getOuterSizes(element){var styles=element.ownerDocument.defaultView.getComputedStyle(element),x=parseFloat(styles.marginTop||0)+parseFloat(styles.marginBottom||0),styles=parseFloat(styles.marginLeft||0)+parseFloat(styles.marginRight||0);return{width:element.offsetWidth+styles,height:element.offsetHeight+x}}function getOppositePlacement(placement){const hash={left:"right",right:"left",bottom:"top",top:"bottom"};return placement.replace(/left|right|bottom|top/g,matched=>hash[matched])}function getPopperOffsets(popper,referenceOffsets,placement){placement=placement.split("-")[0];var popper=getOuterSizes(popper),popperOffsets={width:popper.width,height:popper.height},isHoriz=-1!==["right","left"].indexOf(placement),mainSide=isHoriz?"top":"left",secondarySide=isHoriz?"left":"top",measurement=isHoriz?"height":"width",isHoriz=isHoriz?"width":"height";return popperOffsets[mainSide]=referenceOffsets[mainSide]+referenceOffsets[measurement]/2-popper[measurement]/2,popperOffsets[secondarySide]=placement===secondarySide?referenceOffsets[secondarySide]-popper[isHoriz]:referenceOffsets[getOppositePlacement(secondarySide)],popperOffsets}function find(arr,check){return Array.prototype.find?arr.find(check):arr.filter(check)[0]}function findIndex(arr,prop,value){var match;return Array.prototype.findIndex?arr.findIndex(cur=>cur[prop]===value):(match=find(arr,obj=>obj[prop]===value),arr.indexOf(match))}function runModifiers(modifiers,data,ends){return(void 0===ends?modifiers:modifiers.slice(0,findIndex(modifiers,"name",ends))).forEach(modifier=>{modifier.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var fn=modifier.function||modifier.fn;modifier.enabled&&isFunction(fn)&&(data.offsets.popper=getClientRect(data.offsets.popper),data.offsets.reference=getClientRect(data.offsets.reference),data=fn(data,modifier))}),data}function update(){if(!this.state.isDestroyed){let data={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};data.offsets.reference=getReferenceOffsets(this.state,this.popper,this.reference,this.options.positionFixed),data.placement=computeAutoPlacement(this.options.placement,data.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),data.originalPlacement=data.placement,data.positionFixed=this.options.positionFixed,data.offsets.popper=getPopperOffsets(this.popper,data.offsets.reference,data.placement),data.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",data=runModifiers(this.modifiers,data),this.state.isCreated?this.options.onUpdate(data):(this.state.isCreated=!0,this.options.onCreate(data))}}function isModifierEnabled(modifiers,modifierName){return modifiers.some(({name,enabled})=>enabled&&name===modifierName)}function getSupportedPropertyName(property){var prefixes=[!1,"ms","Webkit","Moz","O"],upperProp=property.charAt(0).toUpperCase()+property.slice(1);for(let i=0;i<prefixes.length;i++){var prefix=prefixes[i],prefix=prefix?""+prefix+upperProp:property;if(void 0!==document.body.style[prefix])return prefix}return null}function destroy(){return this.state.isDestroyed=!0,isModifierEnabled(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[getSupportedPropertyName("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function getWindow(element){element=element.ownerDocument;return element?element.defaultView:window}function attachToScrollParents(scrollParent,event,callback,scrollParents){var isBody="BODY"===scrollParent.nodeName,scrollParent=isBody?scrollParent.ownerDocument.defaultView:scrollParent;scrollParent.addEventListener(event,callback,{passive:!0}),isBody||attachToScrollParents(getScrollParent(scrollParent.parentNode),event,callback,scrollParents),scrollParents.push(scrollParent)}function setupEventListeners(reference,options,state,updateBound){state.updateBound=updateBound,getWindow(reference).addEventListener("resize",state.updateBound,{passive:!0});updateBound=getScrollParent(reference);return attachToScrollParents(updateBound,"scroll",state.updateBound,state.scrollParents),state.scrollElement=updateBound,state.eventsEnabled=!0,state}function enableEventListeners(){this.state.eventsEnabled||(this.state=setupEventListeners(this.reference,this.options,this.state,this.scheduleUpdate))}function removeEventListeners(reference,state){return getWindow(reference).removeEventListener("resize",state.updateBound),state.scrollParents.forEach(target=>{target.removeEventListener("scroll",state.updateBound)}),state.updateBound=null,state.scrollParents=[],state.scrollElement=null,state.eventsEnabled=!1,state}function disableEventListeners(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=removeEventListeners(this.reference,this.state))}function isNumeric(n){return""!==n&&!isNaN(parseFloat(n))&&isFinite(n)}function setStyles(element,styles){Object.keys(styles).forEach(prop=>{let unit="";-1!==["width","height","top","right","bottom","left"].indexOf(prop)&&isNumeric(styles[prop])&&(unit="px"),element.style[prop]=styles[prop]+unit})}function setAttributes(element,attributes){Object.keys(attributes).forEach(function(prop){!1!==attributes[prop]?element.setAttribute(prop,attributes[prop]):element.removeAttribute(prop)})}function applyStyle(data){return setStyles(data.instance.popper,data.styles),setAttributes(data.instance.popper,data.attributes),data.arrowElement&&Object.keys(data.arrowStyles).length&&setStyles(data.arrowElement,data.arrowStyles),data}function applyStyleOnLoad(reference,popper,options,modifierOptions,state){state=getReferenceOffsets(state,popper,reference,options.positionFixed),state=computeAutoPlacement(options.placement,state,popper,reference,options.modifiers.flip.boundariesElement,options.modifiers.flip.padding);return popper.setAttribute("x-placement",state),setStyles(popper,{position:options.positionFixed?"fixed":"absolute"}),options}function getRoundedOffsets(data,shouldRound){var{popper,reference}=data.offsets,{round,floor}=Math,noRound=v=>v,reference=round(reference.width),popperWidth=round(popper.width),isVertical=-1!==["left","right"].indexOf(data.placement),data=-1!==data.placement.indexOf("-"),isVertical=shouldRound?isVertical||data||reference%2==popperWidth%2?round:floor:noRound,floor=shouldRound?round:noRound;return{left:isVertical(reference%2==1&&popperWidth%2==1&&!data&&shouldRound?popper.left-1:popper.left),top:floor(popper.top),bottom:floor(popper.bottom),right:isVertical(popper.right)}}const isFirefox=isBrowser&&/Firefox/i.test(navigator.userAgent);function computeStyle(data,options){var{x,y}=options,popper=data.offsets["popper"],legacyGpuAccelerationOption=find(data.instance.modifiers,modifier=>"applyStyle"===modifier.name).gpuAcceleration,legacyGpuAccelerationOption=(void 0!==legacyGpuAccelerationOption&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"),void 0!==legacyGpuAccelerationOption?legacyGpuAccelerationOption:options.gpuAcceleration),options=getOffsetParent(data.instance.popper),offsetParentRect=getBoundingClientRect(options),popper={position:popper.position},offsets=getRoundedOffsets(data,window.devicePixelRatio<2||!isFirefox),x="bottom"===x?"top":"bottom",y="right"===y?"left":"right",prefixedProperty=getSupportedPropertyName("transform");let left,top;top="bottom"==x?"HTML"===options.nodeName?-options.clientHeight+offsets.bottom:-offsetParentRect.height+offsets.bottom:offsets.top,left="right"==y?"HTML"===options.nodeName?-options.clientWidth+offsets.right:-offsetParentRect.width+offsets.right:offsets.left,legacyGpuAccelerationOption&&prefixedProperty?(popper[prefixedProperty]=`translate3d(${left}px, ${top}px, 0)`,popper[x]=0,popper[y]=0,popper.willChange="transform"):(options="right"==y?-1:1,popper[x]=top*("bottom"==x?-1:1),popper[y]=left*options,popper.willChange=x+", "+y);offsetParentRect={"x-placement":data.placement};return data.attributes=_extends({},offsetParentRect,data.attributes),data.styles=_extends({},popper,data.styles),data.arrowStyles=_extends({},data.offsets.arrow,data.arrowStyles),data}function isModifierRequired(modifiers,requestingName,requestedName){const requesting=find(modifiers,({name})=>name===requestingName);modifiers=!!requesting&&modifiers.some(modifier=>modifier.name===requestedName&&modifier.enabled&&modifier.order<requesting.order);if(!modifiers){const requesting=`\`${requestingName}\``;console.warn(`\`${requestedName}\``+` modifier is required by ${requesting} modifier in order to work, be sure to include it before ${requesting}!`)}return modifiers}function arrow(data,options){if(isModifierRequired(data.instance.modifiers,"arrow","keepTogether")){let arrowElement=options.element;if("string"==typeof arrowElement){if(!(arrowElement=data.instance.popper.querySelector(arrowElement)))return data}else if(!data.instance.popper.contains(arrowElement))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),data;var options=data.placement.split("-")[0],{popper,reference}=data.offsets,options=-1!==["left","right"].indexOf(options),len=options?"height":"width",sideCapitalized=options?"Top":"Left",side=sideCapitalized.toLowerCase(),altSide=options?"left":"top",options=options?"bottom":"right",arrowElementSize=getOuterSizes(arrowElement)[len],options=(reference[options]-arrowElementSize<popper[side]&&(data.offsets.popper[side]-=popper[side]-(reference[options]-arrowElementSize)),reference[side]+arrowElementSize>popper[options]&&(data.offsets.popper[side]+=reference[side]+arrowElementSize-popper[options]),data.offsets.popper=getClientRect(data.offsets.popper),reference[side]+reference[len]/2-arrowElementSize/2),reference=getStyleComputedProperty(data.instance.popper),popperMarginSide=parseFloat(reference["margin"+sideCapitalized]),reference=parseFloat(reference[`border${sideCapitalized}Width`]),sideCapitalized=options-data.offsets.popper[side]-popperMarginSide-reference,sideCapitalized=Math.max(Math.min(popper[len]-arrowElementSize,sideCapitalized),0);data.arrowElement=arrowElement,data.offsets.arrow={[side]:Math.round(sideCapitalized),[altSide]:""}}return data}function getOppositeVariation(variation){return"end"===variation?"start":"start"===variation?"end":variation}var placements=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"];const validPlacements=placements.slice(3);function clockwise(placement,counter=!1){placement=validPlacements.indexOf(placement),placement=validPlacements.slice(placement+1).concat(validPlacements.slice(0,placement));return counter?placement.reverse():placement}const BEHAVIORS={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function flip(data,options){if(!(isModifierEnabled(data.instance.modifiers,"inner")||data.flipped&&data.placement===data.originalPlacement)){const boundaries=getBoundaries(data.instance.popper,data.instance.reference,options.padding,options.boundariesElement,data.positionFixed);let placement=data.placement.split("-")[0],placementOpposite=getOppositePlacement(placement),variation=data.placement.split("-")[1]||"",flipOrder=[];switch(options.behavior){case BEHAVIORS.FLIP:flipOrder=[placement,placementOpposite];break;case BEHAVIORS.CLOCKWISE:flipOrder=clockwise(placement);break;case BEHAVIORS.COUNTERCLOCKWISE:flipOrder=clockwise(placement,!0);break;default:flipOrder=options.behavior}flipOrder.forEach((step,index)=>{if(placement!==step||flipOrder.length===index+1)return data;placement=data.placement.split("-")[0],placementOpposite=getOppositePlacement(placement);var step=data.offsets.popper,refOffsets=data.offsets.reference,floor=Math.floor,refOffsets="left"===placement&&floor(step.right)>floor(refOffsets.left)||"right"===placement&&floor(step.left)<floor(refOffsets.right)||"top"===placement&&floor(step.bottom)>floor(refOffsets.top)||"bottom"===placement&&floor(step.top)<floor(refOffsets.bottom),overflowsLeft=floor(step.left)<floor(boundaries.left),overflowsRight=floor(step.right)>floor(boundaries.right),overflowsTop=floor(step.top)<floor(boundaries.top),step=floor(step.bottom)>floor(boundaries.bottom),floor="left"===placement&&overflowsLeft||"right"===placement&&overflowsRight||"top"===placement&&overflowsTop||"bottom"===placement&&step,isVertical=-1!==["top","bottom"].indexOf(placement),flippedVariationByRef=!!options.flipVariations&&(isVertical&&"start"===variation&&overflowsLeft||isVertical&&"end"===variation&&overflowsRight||!isVertical&&"start"===variation&&overflowsTop||!isVertical&&"end"===variation&&step),overflowsRight=!!options.flipVariationsByContent&&(isVertical&&"start"===variation&&overflowsRight||isVertical&&"end"===variation&&overflowsLeft||!isVertical&&"start"===variation&&step||!isVertical&&"end"===variation&&overflowsTop),overflowsLeft=flippedVariationByRef||overflowsRight;(refOffsets||floor||overflowsLeft)&&(data.flipped=!0,(refOffsets||floor)&&(placement=flipOrder[index+1]),overflowsLeft&&(variation=getOppositeVariation(variation)),data.placement=placement+(variation?"-"+variation:""),data.offsets.popper=_extends({},data.offsets.popper,getPopperOffsets(data.instance.popper,data.offsets.reference,data.placement)),data=runModifiers(data.instance.modifiers,data,"flip"))})}return data}function keepTogether(data){var{popper,reference}=data.offsets,placement=data.placement.split("-")[0],floor=Math.floor,placement=-1!==["top","bottom"].indexOf(placement),side=placement?"right":"bottom",opSide=placement?"left":"top",placement=placement?"width":"height";return popper[side]<floor(reference[opSide])&&(data.offsets.popper[opSide]=floor(reference[opSide])-popper[placement]),popper[opSide]>floor(reference[side])&&(data.offsets.popper[opSide]=floor(reference[side])),data}function toValue(str,measurement,popperOffsets,referenceOffsets){var split=str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),value=+split[1],split=split[2];if(!value)return str;if(0===split.indexOf("%")){let element;return getClientRect(element="%p"===split?popperOffsets:referenceOffsets)[measurement]/100*value}if("vh"!==split&&"vw"!==split)return value;{let size;return(size="vh"===split?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*value}}function parseOffset(offset,popperOffsets,referenceOffsets,basePlacement){const offsets=[0,0],useHeight=-1!==["right","left"].indexOf(basePlacement);var basePlacement=offset.split(/(\+|\-)/).map(frag=>frag.trim()),offset=basePlacement.indexOf(find(basePlacement,frag=>-1!==frag.search(/,|\s/))),splitRegex=(basePlacement[offset]&&-1===basePlacement[offset].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."),/\s*,\s*|\s+/);let ops=-1!==offset?[basePlacement.slice(0,offset).concat([basePlacement[offset].split(splitRegex)[0]]),[basePlacement[offset].split(splitRegex)[1]].concat(basePlacement.slice(offset+1))]:[basePlacement];return(ops=ops.map((op,index)=>{const measurement=(1===index?!useHeight:useHeight)?"height":"width";let mergeWithPrevious=!1;return op.reduce((a,b)=>""===a[a.length-1]&&-1!==["+","-"].indexOf(b)?(a[a.length-1]=b,mergeWithPrevious=!0,a):mergeWithPrevious?(a[a.length-1]+=b,mergeWithPrevious=!1,a):a.concat(b),[]).map(str=>toValue(str,measurement,popperOffsets,referenceOffsets))})).forEach((op,index)=>{op.forEach((frag,index2)=>{isNumeric(frag)&&(offsets[index]+=frag*("-"===op[index2-1]?-1:1))})}),offsets}function offset(data,{offset}){var{placement,offsets:{popper,reference}}=data,placement=placement.split("-")[0];let offsets;return offsets=isNumeric(+offset)?[+offset,0]:parseOffset(offset,popper,reference,placement),"left"===placement?(popper.top+=offsets[0],popper.left-=offsets[1]):"right"===placement?(popper.top+=offsets[0],popper.left+=offsets[1]):"top"===placement?(popper.left+=offsets[0],popper.top-=offsets[1]):"bottom"===placement&&(popper.left+=offsets[0],popper.top+=offsets[1]),data.popper=popper,data}function preventOverflow(data,options){let boundariesElement=options.boundariesElement||getOffsetParent(data.instance.popper);data.instance.reference===boundariesElement&&(boundariesElement=getOffsetParent(boundariesElement));var transformProp=getSupportedPropertyName("transform"),popperStyles=data.instance.popper.style,{top,left,[transformProp]:transform}=popperStyles;popperStyles.top="",popperStyles.left="",popperStyles[transformProp]="";const boundaries=getBoundaries(data.instance.popper,data.instance.reference,options.padding,boundariesElement,data.positionFixed);popperStyles.top=top,popperStyles.left=left,popperStyles[transformProp]=transform,options.boundaries=boundaries;top=options.priority;let popper=data.offsets.popper;const check={primary(placement){let value=popper[placement];return{[placement]:value=popper[placement]<boundaries[placement]&&!options.escapeWithReference?Math.max(popper[placement],boundaries[placement]):value}},secondary(placement){var mainSide="right"===placement?"left":"top";let value=popper[mainSide];return{[mainSide]:value=popper[placement]>boundaries[placement]&&!options.escapeWithReference?Math.min(popper[mainSide],boundaries[placement]-("right"===placement?popper.width:popper.height)):value}}};return top.forEach(placement=>{var side=-1!==["left","top"].indexOf(placement)?"primary":"secondary";popper=_extends({},popper,check[side](placement))}),data.offsets.popper=popper,data}function shift(data){var popper,side,reference,placement=data.placement,basePlacement=placement.split("-")[0],placement=placement.split("-")[1];return placement&&({reference,popper}=data.offsets,reference={start:{[side=(basePlacement=-1!==["bottom","top"].indexOf(basePlacement))?"left":"top"]:reference[side]},end:{[side]:reference[side]+reference[side=basePlacement?"width":"height"]-popper[side]}},data.offsets.popper=_extends({},popper,reference[placement])),data}function hide(data){if(isModifierRequired(data.instance.modifiers,"hide","preventOverflow")){var refRect=data.offsets.reference,bound=find(data.instance.modifiers,modifier=>"preventOverflow"===modifier.name).boundaries;if(refRect.bottom<bound.top||refRect.left>bound.right||refRect.top>bound.bottom||refRect.right<bound.left){if(!0===data.hide)return data;data.hide=!0,data.attributes["x-out-of-boundaries"]=""}else{if(!1===data.hide)return data;data.hide=!1,data.attributes["x-out-of-boundaries"]=!1}}return data}function inner(data){var placement=data.placement,basePlacement=placement.split("-")[0],{popper,reference}=data.offsets,isHoriz=-1!==["left","right"].indexOf(basePlacement),subtractLength=-1===["top","left"].indexOf(basePlacement);return popper[isHoriz?"left":"top"]=reference[basePlacement]-(subtractLength?popper[isHoriz?"width":"height"]:0),data.placement=getOppositePlacement(placement),data.offsets.popper=getClientRect(popper),data}var modifiers={shift:{order:100,enabled:!0,fn:shift},offset:{order:200,enabled:!0,fn:offset,offset:0},preventOverflow:{order:300,enabled:!0,fn:preventOverflow,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:keepTogether},arrow:{order:500,enabled:!0,fn:arrow,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:flip,behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:inner},hide:{order:800,enabled:!0,fn:hide},computeStyle:{order:850,enabled:!0,fn:computeStyle,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:applyStyle,onLoad:applyStyleOnLoad,gpuAcceleration:void 0}},Defaults={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:()=>{},onUpdate:()=>{},modifiers:modifiers};class Popper{constructor(reference,popper,options={}){this.scheduleUpdate=()=>requestAnimationFrame(this.update),this.update=debounce(this.update.bind(this)),this.options=_extends({},Popper.Defaults,options),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=reference&&reference.jquery?reference[0]:reference,this.popper=popper&&popper.jquery?popper[0]:popper,this.options.modifiers={},Object.keys(_extends({},Popper.Defaults.modifiers,options.modifiers)).forEach(name=>{this.options.modifiers[name]=_extends({},Popper.Defaults.modifiers[name]||{},options.modifiers?options.modifiers[name]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(name=>_extends({name:name},this.options.modifiers[name])).sort((a,b)=>a.order-b.order),this.modifiers.forEach(modifierOptions=>{modifierOptions.enabled&&isFunction(modifierOptions.onLoad)&&modifierOptions.onLoad(this.reference,this.popper,this.options,modifierOptions,this.state)}),this.update();reference=this.options.eventsEnabled;reference&&this.enableEventListeners(),this.state.eventsEnabled=reference}update(){return update.call(this)}destroy(){return destroy.call(this)}enableEventListeners(){return enableEventListeners.call(this)}disableEventListeners(){return disableEventListeners.call(this)}}Popper.Utils=("undefined"!=typeof window?window:global).PopperUtils,Popper.placements=placements,Popper.Defaults=Defaults;export default Popper;