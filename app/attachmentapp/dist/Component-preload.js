//@ui5-bundle com/sap/attachmentapp/Component-preload.js
sap.ui.require.preload({
	"com/sap/attachmentapp/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/sap/attachmentapp/model/models"],function(e,t,i){"use strict";return e.extend("com.sap.attachmentapp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/sap/attachmentapp/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("com.sap.attachmentapp.controller.App",{onInit:function(){}})});
},
	"com/sap/attachmentapp/controller/View1.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("com.sap.attachmentapp.controller.View1",{onInit:function(){},onAfterItemAdded:function(e){var t=e.getParameter("item");this._createEntity(t).then(e=>{this._uploadContent(t,e)}).catch(e=>{console.log(e)})},onUploadCompleted:function(e){var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh()},onRemovePressed:function(e){e.preventDefault();e.getParameter("item").getBindingContext().delete();MessageToast.show("Selected file has been deleted")},onOpenPressed:function(e){e.preventDefault();var t=e.getSource();this._fileName=t.getFileName();var a=this;this._download(t).then(e=>{var t=window.URL.createObjectURL(e);var n=document.createElement("a");n.href=t;n.setAttribute("download",a._fileName);document.body.appendChild(n);n.click();document.body.removeChild(n)}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/odata/v4/catalog/Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,n)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){var a="/odata/v4/catalog/Files(${id})/content";e.setUploadUrl(a);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}})});
},
	"com/sap/attachmentapp/i18n/i18n.properties":'# This is the resource bundle for com.sap.attachmentapp\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Attachments\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Attachments',
	"com/sap/attachmentapp/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"com.sap.attachmentapp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.14.4","toolsId":"e20e2512-18f9-464c-8a8d-a7a5251a4607"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.127.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.sap.attachmentapp.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.sap.attachmentapp.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"com.sap.attachmentapp.view.App","type":"XML","async":true,"id":"App"}}}',
	"com/sap/attachmentapp/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/sap/attachmentapp/view/App.view.xml":'<mvc:View controllerName="com.sap.attachmentapp.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/sap/attachmentapp/view/View1.view.xml":'<mvc:View\n    controllerName="com.sap.attachmentapp.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns:upload="sap.m.upload"\n    xmlns="sap.m"\n><Page\n        id="page"\n        title="{i18n>title}"\n    ><content><upload:UploadSet\n                id="uploadSet"\n                instantUpload="false"\n                uploadEnabled="true"\n                afterItemAdded="onAfterItemAdded"\n                uploadCompleted="onUploadCompleted"\n                items="{\n                        path: \'/Files\',\n                        parameters: {\n                            $orderby: \'createdAt desc\'\n                        },\n                        templateShareable: false}"\n            ><upload:items><upload:UploadSetItem\n                        fileName="{fileName}"\n                        mediaType="{mediaType}"\n                        url="{url}"\n                        enabledEdit="false"\n                        visibleEdit="false"\n                        openPressed="onOpenPressed"\n                        visibleRemove="true"\n                        removePressed="onRemovePressed"\n                    ><upload:attributes><ObjectAttribute\n                                title="Uploaded By"\n                                text="{createdBy}"\n                                active="false"\n                            /><ObjectAttribute\n                                title="Uploaded on"\n                                text="{createdAt}"\n                                active="false"\n                            /><ObjectAttribute\n                                title="File Size"\n                                text="{size}"\n                                active="false"\n                            /></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></content></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map