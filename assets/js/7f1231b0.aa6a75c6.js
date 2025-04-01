"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[907],{4637:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>x,frontMatter:()=>n,metadata:()=>d,toc:()=>o});var i=s(4848),l=s(8453);const n={},r="Asset Schema",d={id:"sdo/asset.schema",title:"Asset Schema",description:"Asset",source:"@site/docs/sdo/asset.schema.md",sourceDirName:"sdo",slug:"/sdo/asset.schema",permalink:"/attack-data-model/docs/sdo/asset.schema",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ATT&CK Schemas",permalink:"/attack-data-model/docs/overview"},next:{title:"Campaign Schema",permalink:"/attack-data-model/docs/sdo/campaign.schema"}},c={},o=[{value:"Asset",id:"asset",level:2},{value:"RelatedAsset",id:"relatedasset",level:2},{value:"RelatedAssets",id:"relatedassets",level:2},{value:"XMitreSectors",id:"xmitresectors",level:2}];function h(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"asset-schema",children:"Asset Schema"})}),"\n",(0,i.jsx)(t.h2,{id:"asset",children:"Asset"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"Object containing the following properties:"})}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Property"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Description"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"id"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"type"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"spec_version"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The version of the STIX specification used to represent this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"'2.0' | '2.1'"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"created"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"modified"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"created_by_ref"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"labels"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The labels property specifies a set of terms used to describe this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"Array<string>"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"revoked"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The revoked property indicates whether the object has been revoked."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"boolean"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"confidence"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"number"})," (",(0,i.jsx)(t.em,{children:"int, \u22651, \u226499"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"lang"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Identifies the language of the text content in this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"external_references"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"A list of external references which refers to non-STIX information."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.em,{children:"Array of at least 1 objects:"}),(0,i.jsx)("br",{}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"source_name"}),": ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"description"}),": ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"url"}),": ",(0,i.jsx)(t.code,{children:"string"})," (",(0,i.jsx)(t.em,{children:"url"}),")"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"external_id"}),": ",(0,i.jsx)(t.code,{children:"string"})]})]})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"object_marking_refs"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The list of marking-definition objects to be applied to this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"Array<string>"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"granular_markings"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The set of granular markings that apply to this object."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.em,{children:"Array of objects:"}),(0,i.jsx)("br",{}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"marking_ref"}),": ",(0,i.jsx)(t.code,{children:"string"})," - Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"selectors"}),": ",(0,i.jsx)(t.code,{children:"Array<string>"})]})]})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"extensions"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Specifies any extensions of the object, as a dictionary."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,i.jsx)(t.code,{children:"string"})," ",(0,i.jsx)(t.em,{children:"and values of type"})," ",(0,i.jsx)(t.em,{children:"Object with properties:"}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"extension_type"}),": ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"extension_properties"}),": ",(0,i.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,i.jsx)(t.code,{children:"string"})," ",(0,i.jsx)(t.em,{children:"and values of type"})," ",(0,i.jsx)(t.code,{children:"unknown"})," (",(0,i.jsx)(t.em,{children:"optional & nullable"}),")"]})]})," ",(0,i.jsx)(t.em,{children:"or"})," ",(0,i.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,i.jsx)(t.code,{children:"string"})," ",(0,i.jsx)(t.em,{children:"and values of type"})," ",(0,i.jsx)(t.code,{children:"unknown"})," (",(0,i.jsx)(t.em,{children:"optional & nullable"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"name"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The name of the object."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"string"})," (",(0,i.jsx)(t.em,{children:"min length: 1"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_attack_spec_version"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_version"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_old_attack_id"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Old ATT&CK IDs that may have been associated with this object"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_deprecated"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Indicates whether the object has been deprecated."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"boolean"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"description"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"A description of the object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_platforms"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"List of platforms that apply to the object."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"Array<'Field Controller/RTU/PLC/IED' | 'Network' | 'Data Historian' | 'Google Workspace' | 'Office 365' | 'Containers' | 'Azure AD' | 'Engineering Workstation' | 'Control Server' | 'Human-Machine Interface' | 'Windows' | 'Linux' | 'IaaS' | 'None' | 'iOS' | 'PRE' | 'SaaS' | 'Input/Output Server' | 'macOS' | 'Android' | ...>"})," (",(0,i.jsx)(t.em,{children:"min: 1"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_domains"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The technology domains to which the ATT&CK object belongs."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"Array<'enterprise-attack' | 'mobile-attack' | 'ics-attack'>"})," (",(0,i.jsx)(t.em,{children:"min: 1"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_contributors"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"People and organizations who have contributed to the object. Not found on relationship objects."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"Array<string>"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_sectors"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"List of industry sector(s) an asset may be commonly observed in."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"#xmitresectors",children:"XMitreSectors"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_related_assets"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"#relatedassets",children:"RelatedAssets"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_modified_by_ref"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]})]})]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"(*) Required."})}),"\n",(0,i.jsx)(t.h2,{id:"relatedasset",children:"RelatedAsset"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"Object containing the following properties:"})}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Property"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Description"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"name"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"related_asset_sectors"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"List of industry sector(s) an asset may be commonly observed in."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"#xmitresectors",children:"XMitreSectors"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"description"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"A description of the object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]})]})]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"(*) Required."})}),"\n",(0,i.jsx)(t.h2,{id:"relatedassets",children:"RelatedAssets"}),"\n",(0,i.jsx)(t.p,{children:"Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsxs)(t.em,{children:["Array of ",(0,i.jsx)(t.a,{href:"#relatedasset",children:"RelatedAsset"})," items."]})}),"\n",(0,i.jsx)(t.h2,{id:"xmitresectors",children:"XMitreSectors"}),"\n",(0,i.jsx)(t.p,{children:"List of industry sector(s) an asset may be commonly observed in."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsxs)(t.em,{children:["Array of ",(0,i.jsx)(t.code,{children:"'Electric' | 'Water and Wastewater' | 'Manufacturing' | 'Rail' | 'Maritime' | 'General'"})," items."]})})]})}function x(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>d});var i=s(6540);const l={},n=i.createContext(l);function r(e){const t=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),i.createElement(n.Provider,{value:t},e.children)}}}]);