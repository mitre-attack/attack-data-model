"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[775],{3860:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>x,frontMatter:()=>n,metadata:()=>d,toc:()=>h});var l=s(4848),i=s(8453);const n={},r="Malware Schema",d={id:"sdo/malware.schema",title:"Malware Schema",description:"Malware",source:"@site/docs/sdo/malware.schema.md",sourceDirName:"sdo",slug:"/sdo/malware.schema",permalink:"/attack-data-model/docs/sdo/malware.schema",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Identity Schema",permalink:"/attack-data-model/docs/sdo/identity.schema"},next:{title:"Matrix Schema",permalink:"/attack-data-model/docs/sdo/matrix.schema"}},c={},h=[{value:"Malware",id:"malware",level:2},{value:"StixArtifactType",id:"stixartifacttype",level:2},{value:"StixFileType",id:"stixfiletype",level:2}];function o(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.header,{children:(0,l.jsx)(t.h1,{id:"malware-schema",children:"Malware Schema"})}),"\n",(0,l.jsx)(t.h2,{id:"malware",children:"Malware"}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.em,{children:"Object containing the following properties:"})}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Property"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Description"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"id"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"}}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"type"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"}}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"'malware'"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"spec_version"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The version of the STIX specification used to represent this object."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"'2.0' | '2.1'"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"created"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"modified"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"created_by_ref"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The ID of the Source object that describes who created this object."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"labels"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The labels property specifies a set of terms used to describe this object."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<string>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"revoked"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The revoked property indicates whether the object has been revoked."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"boolean"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"confidence"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"}}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.code,{children:"number"})," (",(0,l.jsx)(t.em,{children:"int, \u22651, \u226499"}),")"]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"lang"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Identifies the language of the text content in this object."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"string"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"external_references"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"A list of external references which refers to non-STIX information."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.em,{children:"Array of at least 1 objects:"}),(0,l.jsx)("br",{}),(0,l.jsxs)("ul",{children:[(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"source_name"}),": ",(0,l.jsx)(t.code,{children:"string"})]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"description"}),": ",(0,l.jsx)(t.code,{children:"string"})]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"url"}),": ",(0,l.jsx)(t.code,{children:"string"})," (",(0,l.jsx)(t.em,{children:"url"}),")"]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"external_id"}),": ",(0,l.jsx)(t.code,{children:"string"})]})]})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"object_marking_refs"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The list of marking-definition objects to be applied to this object."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<any>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"granular_markings"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The set of granular markings that apply to this object."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.em,{children:"Array of objects:"}),(0,l.jsx)("br",{}),(0,l.jsxs)("ul",{children:[(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"marking_ref"}),": ",(0,l.jsx)(t.code,{children:"any"})," - Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"selectors"}),": ",(0,l.jsx)(t.code,{children:"Array<string>"})]})]})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"extensions"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Specifies any extensions of the object, as a dictionary."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,l.jsx)(t.code,{children:"string"})," ",(0,l.jsx)(t.em,{children:"and values of type"})," ",(0,l.jsx)(t.em,{children:"Object with properties:"}),(0,l.jsxs)("ul",{children:[(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"extension_type"}),": ",(0,l.jsx)(t.code,{children:"string"})]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"extension_properties"}),": ",(0,l.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,l.jsx)(t.code,{children:"string"})," ",(0,l.jsx)(t.em,{children:"and values of type"})," ",(0,l.jsx)(t.code,{children:"unknown"})," (",(0,l.jsx)(t.em,{children:"optional & nullable"}),")"]})]})," ",(0,l.jsx)(t.em,{children:"or"})," ",(0,l.jsx)(t.em,{children:"Object with dynamic keys of type"})," ",(0,l.jsx)(t.code,{children:"string"})," ",(0,l.jsx)(t.em,{children:"and values of type"})," ",(0,l.jsx)(t.code,{children:"unknown"})," (",(0,l.jsx)(t.em,{children:"optional & nullable"}),")"]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"name"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The name of the object."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.code,{children:"string"})," (",(0,l.jsx)(t.em,{children:"min length: 1"}),")"]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"x_mitre_attack_spec_version"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"string"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"x_mitre_version"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"x_mitre_old_attack_id"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Old ATT&CK IDs that may have been associated with this object"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"string"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"x_mitre_deprecated"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Indicates whether the object has been deprecated."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"boolean"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"description"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"A description of the object."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"string"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"x_mitre_platforms"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"List of platforms that apply to the object."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.code,{children:"Array<'Field Controller/RTU/PLC/IED' | 'Network' | 'Data Historian' | 'Google Workspace' | 'Office 365' | 'Containers' | 'Azure AD' | 'Engineering Workstation' | 'Control Server' | 'Human-Machine Interface' | 'Windows' | 'Linux' | 'IaaS' | 'None' | 'iOS' | 'PRE' | 'SaaS' | 'Input/Output Server' | 'macOS' | 'Android' | ...>"})," (",(0,l.jsx)(t.em,{children:"min: 1"}),")"]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"x_mitre_contributors"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"}}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<string>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"x_mitre_aliases"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Alternative names used to identify this software. The first alias must match the object's name."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<string>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"x_mitre_modified_by_ref"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"x_mitre_domains"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The technology domains to which the ATT&CK object belongs."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.code,{children:"Array<'enterprise-attack' | 'mobile-attack' | 'ics-attack'>"})," (",(0,l.jsx)(t.em,{children:"min: 1"}),")"]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"aliases"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Alternative names used to identify this software."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<string>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.strong,{children:(0,l.jsx)(t.code,{children:"is_family"})})," (*)"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Whether the object represents a malware family (if true) or a malware instance (if false)"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"boolean"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"malware_types"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"A set of categorizations for the malware being described."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<'adware' | 'backdoor' | 'bot' | 'bootkit' | 'ddos' | 'downloader' | 'dropper' | 'exploit-kit' | 'keylogger' | 'ransomware' | 'remote-access-trojan' | 'resource-exploitation' | 'rogue-security-software' | 'rootkit' | 'screen-capture' | 'spyware' | 'trojan' | 'virus' | 'webshell' | 'wiper' | ...>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"kill_chain_phases"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The list of Kill Chain Phases for which this malware can be used."}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.em,{children:"Array of objects:"}),(0,l.jsx)("br",{}),(0,l.jsxs)("ul",{children:[(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"phase_name"}),": ",(0,l.jsx)(t.code,{children:"string"})]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(t.code,{children:"kill_chain_name"}),": ",(0,l.jsx)(t.code,{children:"'mitre-attack' | 'mitre-mobile-attack' | 'mitre-ics-attack'"})]})]})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"first_seen"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The time that this malware instance or malware family was first seen."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"last_seen"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The time that this malware family or malware instance was last seen."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"any"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"os_execution_envs"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The operating systems that the malware family or malware instance is executable on. This applies to virtualized operating systems as well as those running on bare metal."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<string>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"architecture_execution_envs"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The processor architectures (e.g., x86, ARM, etc.) that the malware instance or family is executable on."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<'alpha' | 'arm' | 'ia-64' | 'mips' | 'powerpc' | 'sparc' | 'x86' | 'x86-64'>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"implementation_languages"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The programming language(s) used to implement the malware instance or family."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<'applescript' | 'bash' | 'c' | 'c++' | 'c#' | 'go' | 'java' | 'javascript' | 'lua' | 'objective-c' | 'perl' | 'php' | 'powershell' | 'python' | 'ruby' | 'scala' | 'swift' | 'typescript' | 'visual-basic' | 'x86-32' | ...>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"capabilities"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Any of the capabilities identified for the malware instance or family."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<'accesses-remote-machines' | 'anti-debugging' | 'anti-disassembly' | 'anti-emulation' | 'anti-memory-forensics' | 'anti-sandbox' | 'anti-vm' | 'captures-input-peripherals' | 'captures-output-peripherals' | 'captures-system-state-data' | 'cleans-traces-of-infection' | 'commits-fraud' | 'communicates-with-c2' | 'compromises-data-integrity' | 'compromises-data-availability' | 'compromises-system-availability' | 'controls-local-machine' | 'degrades-security-software' | 'degrades-system-updates' | 'determines-c2-server' | ...>"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"sample_refs"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The sample_refs property specifies a list of identifiers of the SCO file or artifact objects associated with this malware instance(s) or family."}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"Array<[StixArtifactType](#stixartifacttype) _or_ [StixFileType](#stixfiletype)>"})})]})]})]}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.em,{children:"(*) Required."})}),"\n",(0,l.jsx)(t.h2,{id:"stixartifacttype",children:"StixArtifactType"}),"\n",(0,l.jsx)(t.p,{children:"Used to specify the artifact stixType of the sample_refs property."}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.em,{children:"Any type."})}),"\n",(0,l.jsx)(t.h2,{id:"stixfiletype",children:"StixFileType"}),"\n",(0,l.jsx)(t.p,{children:"Used to specify the file stixType of the sample_refs property."}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.em,{children:"Any type."})})]})}function x(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>d});var l=s(6540);const i={},n=l.createContext(i);function r(e){const t=l.useContext(n);return l.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),l.createElement(n.Provider,{value:t},e.children)}}}]);