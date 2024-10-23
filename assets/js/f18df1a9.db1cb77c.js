"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[461],{8538:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>x,frontMatter:()=>l,metadata:()=>d,toc:()=>o});var i=s(4848),n=s(8453);const l={},r="Mitigation Schema",d={id:"sdo/mitigation.schema",title:"Mitigation Schema",description:"Mitigation",source:"@site/docs/sdo/mitigation.schema.md",sourceDirName:"sdo",slug:"/sdo/mitigation.schema",permalink:"/attack-data-model/docs/sdo/mitigation.schema",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Matrix Schema",permalink:"/attack-data-model/docs/sdo/matrix.schema"},next:{title:"STIX Bundle Schema",permalink:"/attack-data-model/docs/sdo/stix-bundle.schema"}},c={},o=[{value:"Mitigation",id:"mitigation",level:2}];function h(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"mitigation-schema",children:"Mitigation Schema"})}),"\n",(0,i.jsx)(t.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"Object containing the following properties:"})}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Property"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Description"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"id"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"type"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"'course-of-action'"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"spec_version"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The version of the STIX specification used to represent this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"'2.0' | '2.1'"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"created"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"modified"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"created_by_ref"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"labels"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The labels property specifies a set of terms used to describe this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"Array<string>"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"revoked"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The revoked property indicates whether the object has been revoked."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"boolean"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"confidence"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"}}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"number"})," (",(0,i.jsx)(t.em,{children:"int, \u22651, \u226499"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"lang"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Identifies the language of the text content in this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"external_references"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"A list of external references which refers to non-STIX information."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.em,{children:"Array of at least 1 objects:"}),(0,i.jsx)("br",{}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"source_name"}),": ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"description"}),": ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"url"}),": ",(0,i.jsx)(t.code,{children:"string"})," (",(0,i.jsx)(t.em,{children:"url"}),")"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"external_id"}),": ",(0,i.jsx)(t.code,{children:"string"})]})]})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"object_marking_refs"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The list of marking-definition objects to be applied to this object."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"Array<any>"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"granular_markings"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The set of granular markings that apply to this object."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.em,{children:"Array of objects:"}),(0,i.jsx)("br",{}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"marking_ref"}),": ",(0,i.jsx)(t.code,{children:"any"})," - Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"selectors"}),": ",(0,i.jsx)(t.code,{children:"Array<string>"})]})]})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"extensions"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Specifies any extensions of the object, as a dictionary."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,i.jsx)(t.code,{children:"string"})," ",(0,i.jsx)(t.em,{children:"and values of type"})," ",(0,i.jsx)(t.em,{children:"Object with properties:"}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"extension_type"}),": ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsxs)("li",{children:[(0,i.jsx)(t.code,{children:"extension_properties"}),": ",(0,i.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,i.jsx)(t.code,{children:"string"})," ",(0,i.jsx)(t.em,{children:"and values of type"})," ",(0,i.jsx)(t.code,{children:"unknown"})," (",(0,i.jsx)(t.em,{children:"optional & nullable"}),")"]})]})," ",(0,i.jsx)(t.em,{children:"or"})," ",(0,i.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,i.jsx)(t.code,{children:"string"})," ",(0,i.jsx)(t.em,{children:"and values of type"})," ",(0,i.jsx)(t.code,{children:"unknown"})," (",(0,i.jsx)(t.em,{children:"optional & nullable"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"name"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The name of the object."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"string"})," (",(0,i.jsx)(t.em,{children:"min length: 1"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_attack_spec_version"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_version"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_old_attack_id"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Old ATT&CK IDs that may have been associated with this object"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"x_mitre_deprecated"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Indicates whether the object has been deprecated."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"boolean"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"description"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"A description that provides more details and context about the Mitigation."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_domains"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The technology domains to which the ATT&CK object belongs."}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"Array<'enterprise-attack' | 'mobile-attack' | 'ics-attack'>"})," (",(0,i.jsx)(t.em,{children:"min: 1"}),")"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"x_mitre_modified_by_ref"})})," (*)"]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"any"})})]})]})]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"(*) Required."})})]})}function x(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>d});var i=s(6540);const n={},l=i.createContext(n);function r(e){const t=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(l.Provider,{value:t},e.children)}}}]);