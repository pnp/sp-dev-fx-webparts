#Requires -Modules PnP.PowerShell
<#
.SYNOPSIS
    Creates 100 SharePoint News Post pages across 5 sites for a Digital Transformation Showcase.

.DESCRIPTION
    Spreads 100 news articles across 5 SharePoint sites (20 per site), organized around
    Digital Transformation themes: AI & ML, Cloud Infrastructure, Data Analytics,
    Digital Workplace, and Cybersecurity.

    Each article includes:
      - Professional header images (downloaded from Unsplash)
      - Rich multi-section HTML content
      - Author metadata, statistics, and pull quotes
      - Topic tags and reading time

.PARAMETER TenantUrl
    Your SharePoint tenant root URL. Example: https://contoso.sharepoint.com

.PARAMETER SkipImages
    Skip image download/upload. Pages will use a plain default header.

.PARAMETER WhatIf
    Preview mode — prints what would be created without making any changes.

.EXAMPLE
    .\Create-SP-NewsShowcase.ps1 -TenantUrl "https://contoso.sharepoint.com"

.EXAMPLE
    .\Create-SP-NewsShowcase.ps1 -TenantUrl "https://contoso.sharepoint.com" -WhatIf

.NOTES
    Requirements:
      - PnP.PowerShell  : Install-Module PnP.PowerShell -Scope CurrentUser
      - Site Owner or higher on all target sites
      - Internet access for Unsplash image downloads
#>

[CmdletBinding(SupportsShouldProcess)]
param (
    [Parameter(Mandatory = $true)]
    [string]$TenantUrl,

    [string]$ClientId,

    [switch]$SkipImages
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────

$scriptStart  = Get-Date
$logFile      = Join-Path $PSScriptRoot "NewsShowcase-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$imageCache   = Join-Path ([System.IO.Path]::GetTempPath()) "SP-NewsImages"
$imageFolder  = "SiteAssets/NewsImages"   # server-relative sub-path under each site

$sites = @(
    @{ Url = "$TenantUrl/sites/AI-Hub";           Category = "AI";        Name = "AI & Machine Learning Hub" },
    @{ Url = "$TenantUrl/sites/Cloud-Innovation";  Category = "Cloud";     Name = "Cloud & Infrastructure Innovation" },
    @{ Url = "$TenantUrl/sites/Data-Analytics";    Category = "Data";      Name = "Data & Analytics Center" },
    @{ Url = "$TenantUrl/sites/Digital-Workplace"; Category = "Workplace"; Name = "Digital Workplace Hub" },
    @{ Url = "$TenantUrl/sites/CyberSecurity";     Category = "Security";  Name = "Cybersecurity & Digital Trust" }
)

# Five Unsplash photo IDs per category (cycled across 20 articles each)
$categoryImages = @{
    "AI"        = @("1620712943543-bcc4688e7485","1677442135703-1787eea5ce01","1535378917042-10a22c95931a","1675557009483-4f8e08cb06ca","1633356122544-f134324a6cee")
    "Cloud"     = @("1451187580459-43490279c0fa","1558494949-ef010cbdcc31","1484557052118-f32bd25b45b5","1586281380349-632531db7ed4","1544197150086-ca8f55f2ceed")
    "Data"      = @("1551288049-bebda4e38f71","1460925895917-afdab827c52f","1504868584819-f8e8b4b6d7e3","1543269865-cbf427effbad","1509470475192-4516873cf0e9")
    "Workplace" = @("1553877522-43269d4ea984","1600880292203-757bb62b4baf","1573164713714-d95e436ab8d9","1571171637578-41bc2dd41cd2","1497366216548-37526070297c")
    "Security"  = @("1550751827-4bd374c3f58b","1563013544-824ae1b704d3","1516321497487-e288fb19713f","1510915228786-5c13a5b4d9e5","1555255707-8b67e2b924f4")
}

# Rotating author pool per category
$categoryAuthors = @{
    "AI"        = @("Dr. Sarah Chen|Chief AI Officer","Marcus Williams|Head of Machine Learning","Elena Petrov|AI Research Director","James Okonkwo|Principal Data Scientist","Aisha Patel|AI Innovation Lead")
    "Cloud"     = @("Tom Reyes|Cloud Architecture Director","Priya Sharma|Principal Cloud Engineer","Daniel Foster|Head of Infrastructure","Rachel Kim|DevOps Platform Lead","Alex Novak|Cloud Security Architect")
    "Data"      = @("Dr. Amara Osei|Chief Data Officer","Ryan Patterson|Head of Analytics","Jessica Wong|Data Engineering Lead","Omar Hassan|Business Intelligence Director","Linda Kozlov|Data Governance Officer")
    "Workplace" = @("Emma Clarke|Employee Experience Director","David Park|Digital Transformation Lead","Fatima Al-Rashid|Change Management Expert","Noah Bennett|Modern Workplace Architect","Grace Yamamoto|HR Technology Director")
    "Security"  = @("Dr. Robert Nguyen|Chief Security Officer","Olivia Thompson|Zero Trust Architect","Samuel Adeyemi|Threat Intelligence Lead","Hannah Eriksson|Identity & Access Director","Marcus Johansson|Security Operations Manager")
}

# ─────────────────────────────────────────────────────────────────────────────
# ARTICLE CONTENT LIBRARY  (100 articles — 20 per category)
# ─────────────────────────────────────────────────────────────────────────────

$articleLibrary = @{

    # ── AI & MACHINE LEARNING (20) ─────────────────────────────────────────
    "AI" = @(
        @{ Title="How AI Is Revolutionizing Customer Service in 2026"; Slug="ai-customer-service-2026"; Description="Discover how leading organisations are leveraging artificial intelligence to transform customer interactions, reduce costs, and deliver exceptional experiences at scale. With AI handling 80 % of routine enquiries, human agents are freed to solve complex problems that truly require empathy."; Quote="AI isn't replacing human agents — it's empowering them to focus on what matters most: building genuine human connections at scale."; Stats=@("73 % reduction in average first-response time","45 % increase in customer satisfaction scores","£2.3 M average annual savings in support costs"); Tags="AI,Customer Service,Automation,CX"; ReadTime=5 },
        @{ Title="Machine Learning Powers Predictive Maintenance Revolution"; Slug="ml-predictive-maintenance"; Description="Industrial organisations are achieving zero unplanned downtime by deploying ML models that predict equipment failures weeks before they occur. Sensor data, edge computing, and neural networks are fundamentally changing asset management."; Quote="The most expensive machine breakdown is the one you didn't see coming. Predictive ML means we see everything coming."; Stats=@("92 % accuracy predicting failures 2 weeks ahead","68 % reduction in unplanned downtime","£4.7 M average maintenance cost savings annually"); Tags="Machine Learning,Predictive Maintenance,IoT,Manufacturing"; ReadTime=7 },
        @{ Title="Natural Language Processing: Breaking Communication Barriers in Business"; Slug="nlp-breaking-barriers"; Description="Advanced NLP models now understand context, sentiment, and cultural nuance across 100+ languages simultaneously. Global enterprises are using this technology to eliminate language barriers and unlock new international markets."; Quote="Language should never be a barrier to business. With NLP, every conversation is possible — in every language, at any scale."; Stats=@("100+ languages processed with enterprise-grade accuracy","89 % reduction in translation costs","3.4× increase in global customer engagement"); Tags="NLP,AI,Global Business,Communication"; ReadTime=6 },
        @{ Title="Building AI-Ready Organisations: A Leadership Playbook"; Slug="ai-ready-organisations"; Description="Successful AI transformation isn't primarily a technology challenge — it's a cultural and organisational one. This guide outlines the structural changes, skill investments, and governance frameworks that separate AI leaders from AI laggards."; Quote="You don't need perfect data or perfect models to start. You need organisational courage to experiment and learn."; Stats=@("78 % of AI projects fail due to organisational barriers, not technology","Companies with AI governance frameworks see 4× better ROI","85 % of AI leaders cite culture as the #1 success factor"); Tags="AI Strategy,Leadership,Organisational Change,Digital Transformation"; ReadTime=8 },
        @{ Title="Computer Vision in Manufacturing: The Quality Revolution"; Slug="computer-vision-manufacturing"; Description="Computer vision systems are inspecting products with superhuman precision, catching defects invisible to the naked eye and making real-time adjustments to production parameters. Quality assurance has become a competitive advantage."; Quote="Our AI vision system caught a 0.2 mm defect that had escaped our quality team for three years. That discovery alone saved us £1.2 M in warranty claims."; Stats=@("99.7 % defect detection accuracy vs 94 % human baseline","60× faster inspection throughput","£1.8 M average annual quality improvement savings"); Tags="Computer Vision,Manufacturing,Quality Control,Industry 4.0"; ReadTime=6 },
        @{ Title="Generative AI: Transforming Content Creation at Enterprise Scale"; Slug="generative-ai-content-creation"; Description="From marketing copy to technical documentation, generative AI is enabling organisations to produce high-quality content at unprecedented speed. Learn how to harness this technology responsibly while maintaining brand voice and accuracy."; Quote="Generative AI doesn't replace creativity — it amplifies it. Our team's creative output has tripled while quality has improved."; Stats=@("300 % increase in content production velocity","65 % reduction in time-to-market for campaigns","£890 K annual savings in content creation costs"); Tags="Generative AI,Content,Marketing,Productivity"; ReadTime=5 },
        @{ Title="AI Ethics and Governance: Building Trustworthy AI Systems"; Slug="ai-ethics-governance"; Description="As AI drives critical business decisions, robust ethics frameworks and governance structures are essential, not optional. Explore best practices from organisations leading in responsible AI deployment and bias mitigation."; Quote="Trustworthy AI isn't a constraint on innovation — it's the foundation that makes sustainable AI innovation possible."; Stats=@("67 % of consumers trust AI less due to lack of transparency","AI ethics boards reduce compliance incidents by 34 %","Explainable AI improves stakeholder adoption by 89 %"); Tags="AI Ethics,Governance,Responsible AI,Compliance"; ReadTime=7 },
        @{ Title="Intelligent Document Processing: The End of Manual Data Entry"; Slug="intelligent-document-processing"; Description="IDP systems powered by AI are processing invoices, contracts, and forms with accuracy rates exceeding human performance, reclaiming thousands of hours previously lost to manual extraction and validation."; Quote="We processed 2 million documents in the time it would have taken our team 3 years to handle manually. That's not efficiency — that's transformation."; Stats=@("98.5 % accuracy vs 82 % manual average","95 % reduction in document processing time","£3.1 M annual savings in processing costs"); Tags="IDP,Document Processing,Automation,RPA"; ReadTime=5 },
        @{ Title="AI in Healthcare: Revolutionising Diagnostics and Patient Care"; Slug="ai-healthcare-diagnostics"; Description="Medical AI is achieving diagnostic accuracy that surpasses specialists in radiology, pathology, and dermatology — catching diseases earlier and personalising treatment plans to fundamentally improve patient outcomes."; Quote="When AI caught the early-stage cancer our radiologists missed, it wasn't a story about machines versus doctors. It was a story about better medicine."; Stats=@("AI detects breast cancer 11.5 % more accurately than radiologists","94 % reduction in diagnostic report turnaround","45 % improvement in treatment personalisation outcomes"); Tags="AI,Healthcare,Diagnostics,Medical AI"; ReadTime=8 },
        @{ Title="Conversational AI: Beyond Chatbots to Intelligent Digital Colleagues"; Slug="conversational-ai-beyond-chatbots"; Description="Today's conversational AI systems understand context across multi-turn conversations, learn from every interaction, and handle complex workflows with remarkable sophistication — a world away from the frustrating chatbots of the past."; Quote="When users stop saying 'I want to speak to a real person,' you've built something genuinely useful. We hit that milestone last quarter."; Stats=@("87 % self-service resolution rate with modern conversational AI","92 % user satisfaction (up from 34 % with legacy chatbots)","4.2 M interactions monthly handled without human escalation"); Tags="Conversational AI,Chatbots,Virtual Assistants,CX"; ReadTime=6 },
        @{ Title="AI-Powered Fraud Detection: Protecting £50 M in Revenue"; Slug="ai-fraud-detection"; Description="Real-time anomaly detection models can now identify sophisticated fraud patterns in milliseconds, protecting both revenue and customer trust in ways that rule-based systems simply cannot match."; Quote="Fraudsters adapt constantly. Only AI can match the speed and scale required to stay ahead in this arms race."; Stats=@("99.1 % fraud detection rate with 0.002 % false positives","£50 M+ in fraud prevented in first 12 months","Real-time detection in under 50 ms per transaction"); Tags="AI,Fraud Detection,Financial Services,Security"; ReadTime=6 },
        @{ Title="RPA with AI: Automating the Intelligent Enterprise"; Slug="rpa-ai-intelligent-automation"; Description="When traditional RPA meets AI, the result is intelligent automation capable of handling unstructured data, making judgment-based decisions, and continuously improving. Back-office operations are being transformed across every industry."; Quote="We've automated 67 processes we thought were 'too complex for bots.' With AI-enhanced RPA, complexity is no longer a barrier."; Stats=@("340 % increase in automation coverage with AI-enhanced RPA","78 % reduction in exceptions requiring human intervention","£5.2 M annual savings from intelligent automation"); Tags="RPA,Intelligent Automation,AI,Process Optimisation"; ReadTime=6 },
        @{ Title="AI-Driven Personalisation: Delivering 1-to-1 Experiences at Scale"; Slug="ai-personalisation-at-scale"; Description="Modern personalisation engines are moving beyond demographic segmentation to true individual-level customisation — processing thousands of real-time behavioural signals to deliver experiences that feel personally crafted."; Quote="Personalisation at scale isn't about knowing your customers better — it's about serving them better, every time, without fail."; Stats=@("312 % increase in conversion rates with AI personalisation","58 % reduction in customer churn","£8.7 M annual revenue uplift from personalisation"); Tags="Personalisation,AI,CX,E-commerce,Marketing"; ReadTime=5 },
        @{ Title="AI-Powered Supply Chain Optimisation: Building Resilient Networks"; Slug="ai-supply-chain-optimisation"; Description="AI systems that process millions of variables in real time — from weather events to geopolitical shifts — are helping organisations build supply chains that bend but don't break under disruption."; Quote="During the last major supply disruption, our AI system rerouted 2,000 shipments in 4 hours. Our competitors took 4 weeks."; Stats=@("87 % improvement in demand forecasting accuracy","43 % reduction in excess inventory costs","£12.3 M in supply chain savings in year one"); Tags="Supply Chain,AI,Logistics,Forecasting,Operations"; ReadTime=7 },
        @{ Title="The Role of AI in Building a Sustainable Future"; Slug="ai-sustainability"; Description="AI is becoming one of the most powerful tools in our sustainability arsenal — optimising energy consumption, accelerating green materials research, and helping organisations hit net-zero commitments faster than ever."; Quote="Our AI energy optimisation system has done more for our sustainability goals in 18 months than our traditional programmes did in 5 years."; Stats=@("34 % average reduction in energy consumption with AI","AI accelerates climate research by up to 1,000×","Organisations using AI for sustainability see 2.8× better ESG performance"); Tags="Sustainability,AI,Green Technology,ESG,Net Zero"; ReadTime=6 },
        @{ Title="Autonomous Systems: The Future of Industrial Operations"; Slug="autonomous-systems-industrial"; Description="From self-directing warehouse robots to autonomous inspection drones, AI-powered autonomous systems are taking over dangerous, repetitive, and high-precision tasks — reshaping what industrial operations can look like."; Quote="Our autonomous warehouse operates 24/7 with zero breaks, zero accidents, and 340 % throughput vs our previous operation."; Stats=@("340 % increase in operational throughput","Zero workplace accidents in 18 months of autonomous operations","£7.8 M annual cost savings"); Tags="Autonomous Systems,Robotics,AI,Industrial Automation"; ReadTime=7 },
        @{ Title="AI in Financial Services: Transforming Risk Management"; Slug="ai-financial-services-risk"; Description="Banks and insurers are deploying AI to assess risk with unprecedented precision, process loan applications in seconds, and detect market anomalies before they cascade into losses."; Quote="We're making better credit decisions in 3 seconds than our analysts made in 3 days — and without the unconscious bias."; Stats=@("89 % reduction in loan processing time","23 % improvement in risk prediction accuracy","£15 M reduction in non-performing loans through AI credit scoring"); Tags="Financial Services,AI,Risk Management,Fintech,Banking"; ReadTime=7 },
        @{ Title="Smart Cities: How AI Is Reshaping Urban Living"; Slug="smart-cities-ai"; Description="Progressive cities are deploying AI across transportation, energy, safety, and public services — setting the blueprint for urban life in 2030 and beyond."; Quote="A smart city doesn't just use technology — it uses technology to be more human, more accessible, and more equitable for every resident."; Stats=@("27 % reduction in traffic congestion with AI traffic management","£2.3 B in annual urban efficiency gains across smart city programmes","34 % improvement in public safety response times"); Tags="Smart Cities,AI,Urban Innovation,Sustainability"; ReadTime=8 },
        @{ Title="Edge AI: Bringing Intelligence to the Source of Data"; Slug="edge-ai"; Description="Processing AI models directly at the point of data collection — on sensors, cameras, and devices — enables real-time decisions that cloud-dependent systems simply cannot match, with a fraction of the bandwidth cost."; Quote="When you need a decision in 10 ms, you can't afford the round trip to the cloud. Edge AI makes real-time intelligence possible anywhere."; Stats=@("10 ms average inference time at edge vs 150 ms cloud","78 % reduction in bandwidth costs with edge processing","Edge AI market growing at 39 % CAGR through 2028"); Tags="Edge AI,IoT,Real-time,Manufacturing,Retail"; ReadTime=6 },
        @{ Title="AI Agents: The Dawn of Autonomous Business Processes"; Slug="ai-agents-autonomous"; Description="AI agents that can plan, reason, and execute multi-step business processes autonomously are moving from research labs into production — enabling a new class of business automation that goes far beyond rule-based workflows."; Quote="Our AI agent doesn't just answer questions — it takes actions, monitors outcomes, and adapts its approach. It's like having a 24/7 analyst who never needs sleep."; Stats=@("AI agents autonomously complete 45 % of knowledge worker tasks","78 % reduction in routine analytical process time","Agentic AI adoption growing at 67 % YoY in enterprise"); Tags="AI Agents,Autonomous AI,Agentic,Productivity,Future of Work"; ReadTime=7 }
    )

    # ── CLOUD & INFRASTRUCTURE (20) ────────────────────────────────────────
    "Cloud" = @(
        @{ Title="Azure Migration Success: 500 Applications in 90 Days"; Slug="azure-migration-500-apps"; Description="Migrating an entire enterprise application portfolio to Azure in 90 days sounds impossible — unless you have the right strategy, tooling, and team. This is the story of how it happened."; Quote="The migration that was going to take 3 years took 90 days. The business transformation that followed is changing our industry."; Stats=@("500 applications migrated in 90 days","67 % reduction in infrastructure costs post-migration","99.99 % availability maintained throughout"); Tags="Azure,Cloud Migration,Digital Transformation,Infrastructure"; ReadTime=8 },
        @{ Title="Multi-Cloud Strategy: Why One Cloud Is Never Enough"; Slug="multi-cloud-strategy"; Description="Vendor lock-in, single points of failure, and missed innovation opportunities are driving enterprises to adopt multi-cloud architectures. Discover the framework for building a coherent multi-cloud strategy."; Quote="Multi-cloud isn't about distrust of any one vendor. It's about giving your business the optionality it needs to compete in a fast-moving landscape."; Stats=@("87 % of enterprises use a multi-cloud approach","34 % cost reduction via intelligent workload placement","Multi-cloud strategies reduce vendor lock-in risk by 78 %"); Tags="Multi-Cloud,Cloud Strategy,Azure,Architecture"; ReadTime=7 },
        @{ Title="Serverless Architecture: Eliminating Infrastructure Overhead Forever"; Slug="serverless-architecture"; Description="Serverless computing has matured from a promising concept to a production-proven architecture powering some of the world's most demanding workloads. Cost savings and developer productivity gains are dramatic."; Quote="We stopped thinking about servers the day we went serverless. Now we just think about delivering value to our customers."; Stats=@("78 % reduction in infrastructure management overhead","45 % improvement in developer productivity","60 % cost reduction for event-driven workloads"); Tags="Serverless,Azure Functions,Cloud,Architecture"; ReadTime=6 },
        @{ Title="FinOps: Taming Cloud Costs Without Sacrificing Performance"; Slug="finops-cloud-costs"; Description="Cloud spending has become one of the fastest-growing IT cost categories. FinOps brings financial accountability to cloud consumption, ensuring every pound spent delivers maximum business value."; Quote="FinOps isn't about spending less — it's about spending right. Understanding your cloud ROI transforms the conversation from cost to investment."; Stats=@("Average organisation wastes 32 % of cloud spend","FinOps programmes achieve 25–35 % cost reduction in 90 days","Organisations with FinOps practices see 2.4× better cloud ROI"); Tags="FinOps,Cloud Cost,Optimisation,Azure,Cost Management"; ReadTime=6 },
        @{ Title="Kubernetes at Enterprise Scale: Lessons from 10,000 Containers"; Slug="kubernetes-enterprise-scale"; Description="Managing Kubernetes at enterprise scale introduces challenges that small deployments never encounter. From multi-tenancy to cost allocation, here are the hard-won lessons from organisations running 10,000+ containers in production."; Quote="Kubernetes is powerful. Kubernetes at enterprise scale is humbling. The organisations that succeed treat it as a platform, not just a runtime."; Stats=@("67 % of Fortune 500 run Kubernetes in production","Enterprise Kubernetes deployments average 847 nodes","Teams using AKS spend 40 % less on operations"); Tags="Kubernetes,AKS,Containers,DevOps,Enterprise"; ReadTime=8 },
        @{ Title="Cloud-Native Development: Building Applications for the Modern Era"; Slug="cloud-native-development"; Description="Cloud-native isn't just about where you run applications — it's a fundamentally different way of designing, building, and operating them. Twelve-factor principles and microservices patterns define the modern standard."; Quote="Cloud-native development is a mindset change before it's a technology change. Teams that get the mindset right unlock the technology benefits automatically."; Stats=@("Cloud-native apps deploy 200× more frequently than traditional","85 % reduction in time-to-market with cloud-native architecture","45 % lower total cost of ownership for fully cloud-native orgs"); Tags="Cloud Native,Microservices,DevOps,Architecture,Containers"; ReadTime=7 },
        @{ Title="DevSecOps: Embedding Security into Every Stage of the Pipeline"; Slug="devsecops"; Description="Security as an afterthought creates expensive vulnerabilities and slow release cycles. DevSecOps integrates security practices directly into the development pipeline, catching issues early when they're cheap to fix."; Quote="The most secure code is code that was written securely from the start. DevSecOps makes secure coding the path of least resistance."; Stats=@("6× faster security issue resolution","80 % reduction in vulnerabilities reaching production","DevSecOps reduces breach remediation costs by £2.8 M per incident on average"); Tags="DevSecOps,Security,CI/CD,DevOps,Vulnerability Management"; ReadTime=7 },
        @{ Title="Edge Computing: Bringing the Cloud to the Network Edge"; Slug="edge-computing"; Description="For use cases requiring ultra-low latency, data sovereignty, or resilient offline operation, edge computing extends cloud capabilities to where data is generated. Manufacturing plants and retail sites are already benefiting."; Quote="We couldn't wait 50 ms for cloud responses on our production line. Edge computing gave us the latency we needed without sacrificing cloud integration."; Stats=@("5 ms latency at edge vs 50–100 ms cloud","60 % bandwidth cost reduction for high-volume sources","Edge deployments growing at 37 % CAGR; will process 75 % of enterprise data by 2028"); Tags="Edge Computing,IoT,Low Latency,Hybrid Cloud,Manufacturing"; ReadTime=6 },
        @{ Title="Cloud Migration: 10 Lessons We Learned the Hard Way"; Slug="cloud-migration-lessons"; Description="The difference between successful migrations and troubled ones often comes down to whether organisations learn from others' mistakes before making their own. Here are the 10 most valuable lessons."; Quote="The lessons from failed migrations are more valuable than any cloud vendor training. We collected them so you don't have to learn them yourself."; Stats=@("70 % of cloud migrations experience significant cost overruns","Proven frameworks complete migrations 3× faster","Post-migration optimisation reduces cloud costs by a further 25–40 %"); Tags="Cloud Migration,Lessons Learned,Best Practices,Digital Transformation"; ReadTime=9 },
        @{ Title="Building Resilient Cloud Architectures: Design for Failure"; Slug="resilient-cloud-architecture"; Description="In distributed systems, failures aren't possible — they're inevitable. Discover the architectural patterns, chaos engineering practices, and operational procedures that define truly resilient cloud systems."; Quote="We don't try to prevent failures. We design systems that keep working when failures happen, because they always will."; Stats=@("Chaos engineering practitioners see 86 % fewer production incidents","Well-architected cloud systems achieve 99.99 % availability","Resilience investments return 8:1 ROI through prevented outage costs"); Tags="Resilience,Cloud Architecture,High Availability,Chaos Engineering"; ReadTime=7 },
        @{ Title="Infrastructure as Code: Treating Your Infrastructure Like Software"; Slug="infrastructure-as-code"; Description="IaC revolutionises how organisations provision and manage infrastructure. By applying software engineering practices — version control, code review, automated testing — teams achieve consistency and safety that manual processes can never match."; Quote="The moment you treat infrastructure as software, everything changes. Your entire environment becomes reproducible, auditable, and improvable."; Stats=@("70 % faster environment provisioning","95 % reduction in configuration drift incidents","40 % less time spent on infrastructure maintenance"); Tags="IaC,Terraform,Bicep,DevOps,Automation"; ReadTime=6 },
        @{ Title="Hybrid Cloud Strategy: Getting the Best of Both Worlds"; Slug="hybrid-cloud-strategy"; Description="A hybrid cloud approach allows organisations to run each workload on the platform best suited to its requirements. Explore the decision frameworks and governance models that make hybrid cloud work in practice."; Quote="Hybrid cloud isn't a compromise — it's an optimisation. The right workload on the right platform, managed with a unified strategy."; Stats=@("72 % of enterprises report hybrid cloud as their primary IT model","Hybrid cloud reduces data sovereignty risk by 67 %","31 % better overall cloud ROI vs all-in approaches"); Tags="Hybrid Cloud,Azure Arc,On-Premises,Strategy,Integration"; ReadTime=7 },
        @{ Title="API-First Development: Building for Integration from Day One"; Slug="api-first-development"; Description="API-first development treats APIs as first-class products, not internal implementation details. Organisations that build this way create ecosystems rather than monoliths, driving competitive advantage through partnership and innovation."; Quote="Every API you build is a door. Build them well and partners, customers, and developers will walk through and build value you never imagined."; Stats=@("API-first companies achieve 3× faster partner integrations","78 % of digital revenue at leading companies flows through APIs","New products launched 50 % faster with mature API strategies"); Tags="API,API-First,Development,Integration,Digital Ecosystem"; ReadTime=6 },
        @{ Title="Cloud Disaster Recovery: Minutes RTO for Mission-Critical Systems"; Slug="cloud-disaster-recovery"; Description="Traditional DR meant tape backups and recovery times measured in days. Cloud DR has transformed the equation — enabling recovery time objectives of minutes at a fraction of the traditional cost."; Quote="We went from a 72-hour RTO to a 15-minute RTO. The cost went down 60 %. That's what cloud disaster recovery looks like."; Stats=@("Cloud DR reduces RTO from hours to minutes for 89 % of organisations","60 % cost reduction vs traditional DR","4× better regulatory compliance scores with cloud DR"); Tags="Disaster Recovery,Business Continuity,Cloud,RTO,RPO"; ReadTime=6 },
        @{ Title="Microservices vs Monolith: Making the Right Architecture Choice"; Slug="microservices-vs-monolith"; Description="This evidence-based analysis cuts through the dogma to help organisations make the right architectural choice for their context, team size, and business requirements — rather than following hype."; Quote="The question is never 'microservices or monolith.' It's always 'what does our business need and what can our team operate successfully?'"; Stats=@("67 % of microservices migrations improve deployment frequency","40 % of rushed microservices adopters later consolidated back","Maximum value with teams of 8+ engineers per service"); Tags="Microservices,Architecture,Monolith,Design Patterns,Engineering"; ReadTime=8 },
        @{ Title="Digital Twins: Creating Virtual Replicas of Physical Reality"; Slug="digital-twins"; Description="Digital twin technology creates real-time virtual replicas of physical assets — enabling simulation, optimisation, and prediction at a scale impossible in the physical world. From jet engines to entire city grids, digital twins are reshaping operations."; Quote="Before we change anything in the physical plant, we simulate it 1,000 times in our digital twin. We only run scenarios the simulations say will succeed."; Stats=@("Digital twins reduce physical testing costs by up to 90 %","25 % improvement in operational efficiency","Digital twin market projected to reach £62 B by 2027"); Tags="Digital Twins,Simulation,IoT,Manufacturing,Smart Infrastructure"; ReadTime=7 },
        @{ Title="Site Reliability Engineering: Building for Operational Excellence"; Slug="site-reliability-engineering"; Description="SRE applies software engineering principles to IT operations, creating systems that are more reliable, more observable, and faster to recover from incidents — while transforming the relationship between dev and ops."; Quote="SRE doesn't just make systems more reliable. It makes engineering teams more confident, because they know they can see what's happening and recover quickly."; Stats=@("SRE organisations achieve 4× better system availability","50 % reduction in mean time to recovery","SRE teams deploy 3× more frequently with 50 % fewer failures"); Tags="SRE,Site Reliability,DevOps,Operations,Monitoring"; ReadTime=7 },
        @{ Title="Container Security: Hardening Your Kubernetes Workloads"; Slug="container-security"; Description="The rapid adoption of containers has introduced new attack surfaces that many organisations are only beginning to address. This guide covers the controls, policies, and tools needed to run containers in production with confidence."; Quote="Container security isn't about slowing development — it's about making developers confident that what they ship is safe."; Stats=@("87 % of container images have critical or high severity vulnerabilities","Container security incidents increased 300 % in two years","Mature container security postures see 65 % fewer incidents"); Tags="Container Security,Kubernetes,DevSecOps,Cloud Security"; ReadTime=8 },
        @{ Title="Platform Engineering: Internal Developer Portals That Actually Work"; Slug="platform-engineering"; Description="Platform engineering bridges the gap between infrastructure complexity and developer productivity. Internal developer platforms with golden paths and self-service capabilities are transforming how engineering organisations operate."; Quote="The best platform is one developers don't notice. It just makes everything easier, faster, and safer without adding cognitive load."; Stats=@("Platform engineering reduces developer onboarding time by 70 %","4× improvement in deployment frequency","60 % higher developer satisfaction with mature IDPs"); Tags="Platform Engineering,Developer Experience,IDP,DevOps"; ReadTime=7 },
        @{ Title="Cloud Cost Anomaly Detection: Never Be Surprised by Your Cloud Bill Again"; Slug="cloud-cost-anomaly-detection"; Description="ML-powered anomaly detection systems identify cost spikes within minutes and provide actionable root cause analysis — transforming surprise cloud bills from a common rite of passage to a thing of the past."; Quote="Our first unexpected cloud bill was £450 K. After anomaly detection, we've caught every spike within 15 minutes. The last one would have been £340 K — it cost us nothing."; Stats=@("Average cloud cost anomaly costs £89 K per incident","Anomaly detection catches 94 % of incidents within 15 minutes","Proactive cost management saves £1.2 M annually on average"); Tags="Cloud Cost,Anomaly Detection,FinOps,Azure Cost Management"; ReadTime=5 }
    )

    # ── DATA & ANALYTICS (20) ──────────────────────────────────────────────
    "Data" = @(
        @{ Title="Building a Data-Driven Culture: Beyond Dashboards and Definitions"; Slug="data-driven-culture"; Description="A data-driven culture isn't created by implementing BI tools or mandating training. It's built through a fundamental shift in how decisions are made and questions are asked at every level of the organisation."; Quote="Data-driven culture isn't about having data — every organisation has data. It's about having the discipline to use it, even when it contradicts your intuition."; Stats=@("Only 26 % of executives rate their organisations as data-driven","Data-driven organisations are 23× more likely to acquire customers","Mature data cultures see 3.4× revenue growth vs peers"); Tags="Data Culture,Analytics,Business Intelligence,Digital Transformation"; ReadTime=7 },
        @{ Title="Real-Time Analytics with Azure Synapse: From Data to Decision in Seconds"; Slug="real-time-analytics-synapse"; Description="Azure Synapse Analytics brings together data integration, warehousing, and real-time analytics in a unified platform — delivering the competitive advantage of acting on data as it arrives, not hours later."; Quote="We used to make decisions based on yesterday's data. Now we make them based on this minute's data. The difference in outcomes is extraordinary."; Stats=@("Real-time analytics reduces decision latency from hours to seconds","87 % of business leaders report competitive advantage from real-time analytics","Azure Synapse processes 180 M transactions per second in production"); Tags="Real-time Analytics,Azure Synapse,Data Warehousing"; ReadTime=6 },
        @{ Title="Data Mesh Architecture: Decentralising Data Ownership at Scale"; Slug="data-mesh-architecture"; Description="Data mesh challenges the centralised data team model by distributing data ownership to domain teams who understand their data best — transforming how large enterprises manage and deliver data products."; Quote="Data mesh doesn't solve data problems with better technology. It solves them by putting ownership where the knowledge is."; Stats=@("Data mesh adopters see 67 % improvement in data quality","Time to produce new data products reduces 78 % with domain ownership","Data mesh growing at 45 % annually among Fortune 1000"); Tags="Data Mesh,Data Architecture,Data Products,Data Governance"; ReadTime=8 },
        @{ Title="Power BI at Scale: Democratising Insights Across 10,000 Users"; Slug="power-bi-scale"; Description="When every employee has access to trusted, real-time insights relevant to their role, the impact on decision quality, speed, and alignment is transformational. Here's how to deploy Power BI at true enterprise scale."; Quote="The moment a factory floor supervisor sees their team's performance in real time and connects it to company goals — that's when analytics becomes truly transformational."; Stats=@("Self-service analytics means 34 % faster decision-making","Power BI enterprise deployments average 89 % user adoption","Every £1 in analytics infrastructure returns £7.50 in business value"); Tags="Power BI,Analytics,Business Intelligence,Self-Service"; ReadTime=6 },
        @{ Title="Data Governance: Building the Foundation for Trusted Data"; Slug="data-governance"; Description="Without governance, data initiatives create more confusion than clarity. A robust framework defining ownership, quality standards, lineage tracking, and access policies transforms raw data into a trusted organisational asset."; Quote="Governance isn't bureaucracy. It's the foundation that allows data teams to move fast with confidence instead of fast with consequences."; Stats=@("Poor data quality costs organisations £12.8 M annually on average","Data governance programmes see 56 % fewer data incidents","GDPR fines average £4.1 M — governance prevents them"); Tags="Data Governance,Data Quality,Compliance,Data Management"; ReadTime=7 },
        @{ Title="Predictive Analytics in Retail: Knowing What Customers Want Before They Do"; Slug="predictive-analytics-retail"; Description="Retail organisations are deploying predictive analytics to optimise inventory, personalise offers, prevent churn, and maximise lifetime value — resulting in fewer markdowns, less waste, and more loyal customers."; Quote="We stopped reacting to what customers did and started anticipating what they would do. Inventory costs dropped 34 % and customer satisfaction went up 28 % simultaneously."; Stats=@("Predictive inventory management reduces stockouts by 45 %","Personalised predictive offers see 312 % higher redemption rates","Predictive analytics generates 15–20 % revenue uplift in retail"); Tags="Predictive Analytics,Retail,Machine Learning,Inventory"; ReadTime=6 },
        @{ Title="Customer 360: Achieving the Single View That Changes Everything"; Slug="customer-360"; Description="The Customer 360 has been an aspiration for decades and a reality for only a handful of organisations. Modern data platforms are finally making unified customer profiles achievable at enterprise scale."; Quote="With a true Customer 360, every interaction is informed by every previous interaction. That's when service becomes truly personal."; Stats=@("Customer 360 organisations see 23 % higher customer lifetime value","Unified profiles reduce service costs by 31 %","Cross-sell and upsell revenue increases 45 % on average"); Tags="Customer 360,CRM,Data Integration,Customer Experience"; ReadTime=7 },
        @{ Title="DataOps: Bringing Agility to Enterprise Data Pipelines"; Slug="dataops-agility"; Description="DataOps applies the collaboration, automation, and monitoring principles of DevOps to data engineering — dramatically improving the reliability, quality, and velocity of data pipeline delivery."; Quote="Before DataOps, our data team was a 6-week bottleneck. After DataOps, we're a 2-day accelerator. The business can't imagine going back."; Stats=@("DataOps reduces data pipeline failures by 85 %","Data products deployed 5× more frequently","Data quality incidents drop 75 % with automated DataOps monitoring"); Tags="DataOps,Data Engineering,DevOps,Data Pipelines,Automation"; ReadTime=6 },
        @{ Title="Graph Analytics: Uncovering Hidden Relationships in Your Data"; Slug="graph-analytics"; Description="Traditional relational analytics answers questions you already know to ask. Graph analytics reveals the connections you didn't know existed — enabling breakthrough insights in fraud detection, recommendation engines, and network analysis."; Quote="Graph analytics showed us that 23 % of our fraud network was connected through a single point. We never would have found that with traditional analytics."; Stats=@("Graph analytics detects 40 % more fraud than traditional methods","Recommendation engines with graph analytics see 3× improvement","Supply chain graph analytics reduces risk exposure by 56 %"); Tags="Graph Analytics,Network Analysis,Fraud Detection,Recommendations"; ReadTime=7 },
        @{ Title="IoT Data Processing at Scale: From Sensors to Actionable Insights"; Slug="iot-data-at-scale"; Description="Modern industrial IoT deployments generate millions of sensor readings per second. Processing this data efficiently, extracting meaningful insights, and acting on them in real time requires a purpose-built streaming and batch architecture."; Quote="Our factory generates 2 TB of sensor data daily. Our platform processes all of it, finds anomalies, and alerts operators in under 500 ms."; Stats=@("Industrial IoT deployments average 30,000+ connected sensors per facility","Real-time IoT analytics reduces equipment downtime by 43 %","IoT platforms process 4.5 trillion messages per day globally"); Tags="IoT,Data Processing,Streaming Analytics,Industrial,Real-time"; ReadTime=6 },
        @{ Title="Self-Service Analytics: Empowering Every Employee with Data"; Slug="self-service-analytics"; Description="When done well, self-service analytics creates an explosion of insights and data-driven decisions. When done poorly, it creates conflicting numbers that destroy trust. This guide shows how to do it well."; Quote="The goal of self-service analytics isn't to replace the data team. It's to make the data team's work so foundational that everyone can build on it without them."; Stats=@("Well-implemented self-service reduces BI team requests by 67 %","4× more data-driven decisions in self-service organisations","Business unit agility improves 89 % with self-service platforms"); Tags="Self-Service Analytics,Power BI,Data Democratisation,BI"; ReadTime=6 },
        @{ Title="Privacy-First Analytics: Turning Compliance into Competitive Advantage"; Slug="privacy-first-analytics"; Description="Organisations that treat privacy as a design principle — not a constraint — are building analytics capabilities that regulators and customers trust, creating genuine competitive advantage in a privacy-sensitive market."; Quote="Privacy-first analytics isn't about doing less with data. It's about doing more with data that customers actually want you to have."; Stats=@("85 % of consumers are more loyal to brands they trust with their data","Privacy-compliant programmes avoid £4.3 M average annual regulatory risk","Differential privacy enables analytics on sensitive data without individual exposure"); Tags="Privacy,GDPR,Analytics,Compliance,Data Ethics"; ReadTime=7 },
        @{ Title="Monetising Data Assets: Turning Information Into Revenue"; Slug="data-monetisation"; Description="The data your organisation collects has value beyond internal decision-making. Innovative organisations are packaging insights, creating data products, and building external marketplaces that generate entirely new revenue streams."; Quote="We realised our logistics data was more valuable to ecosystem partners than our physical products. The data business is now our fastest-growing revenue stream."; Stats=@("Data monetisation adds 15–25 % to top-line revenue on average","Data product companies command 5× higher valuations","54 % of enterprise CDOs are now accountable for revenue from data"); Tags="Data Monetisation,Data Products,Revenue,Data Strategy"; ReadTime=7 },
        @{ Title="Data Quality Management: The Hidden Cost of Dirty Data"; Slug="data-quality-management"; Description="Poor data quality is invisible until it's expensive. This framework covers profiling, cleansing, monitoring, and the organisational processes that sustain quality — transforming data from a liability into a trusted asset."; Quote="Bad data cost us a £6 M contract. Our CFO's reaction funded a data quality programme that has since saved 10× that figure. Expensive lessons are the most convincing ones."; Stats=@("Poor data quality costs organisations £12.8 M on average annually","Data quality programmes deliver 10:1 average ROI","67 % of analytics projects fail due to data quality issues"); Tags="Data Quality,Data Management,Data Governance,Analytics"; ReadTime=6 },
        @{ Title="Streaming Analytics: Making Decisions at the Speed of Business"; Slug="streaming-analytics"; Description="Batch analytics tells you what happened. Streaming analytics tells you what's happening — right now. For organisations where seconds matter, event-driven streaming represents a fundamental shift in competitive advantage."; Quote="When we moved from daily batch to real-time streaming, we didn't just get faster analytics. We discovered entirely new use cases that batch couldn't support."; Stats=@("Streaming analytics enables 10,000× faster response to business events","Real-time analytics reduces fraud losses by 67 %","Streaming platforms process over 4 trillion events daily globally"); Tags="Streaming Analytics,Event Hubs,Kafka,Real-time,Data Platforms"; ReadTime=6 },
        @{ Title="AI for Business Analytics: Augmenting Analyst Intelligence"; Slug="ai-business-analytics"; Description="AI is transforming business analytics from a reporting function into a forward-looking intelligence engine. Automated anomaly detection, natural language querying, and predictive insights are augmenting — not replacing — analytical talent."; Quote="AI handles the 80 % of analytical work that is routine. Our analysts now spend their time on the 20 % that requires human judgment and creativity."; Stats=@("AI-augmented analytics reduces time to insight by 75 %","Natural language BI queries increase business user engagement 4×","Automated anomaly detection catches 94 % of data quality issues humans miss"); Tags="AI Analytics,Business Intelligence,Augmented Analytics,Power BI"; ReadTime=6 },
        @{ Title="Open Data Initiatives: The Public Sector Data Revolution"; Slug="open-data-public-sector"; Description="Government and public sector organisations are unlocking enormous value by making data available to citizens, researchers, and enterprises — driving transparency, enabling innovation ecosystems, and generating measurable economic value."; Quote="Every dataset we open creates potential we can't see. The innovations that emerge from open data are always more valuable than the risks we feared."; Stats=@("Open government data generates £3.2 B annually in the UK","Open data reduces duplicated collection costs by 45 %","70 % of high-value open datasets enable new commercial products within 18 months"); Tags="Open Data,Public Sector,Transparency,Innovation,Government"; ReadTime=7 },
        @{ Title="Lakehouse Architecture: Combining the Best of Lakes and Warehouses"; Slug="lakehouse-architecture"; Description="The data lakehouse combines the flexibility of data lakes with the performance of data warehouses — supporting diverse analytics workloads from a single unified platform and eliminating costly data duplication."; Quote="We maintained 3 separate platforms for our data needs. The lakehouse collapsed them into one, cut costs by 60 %, and actually improved performance."; Stats=@("Lakehouse architectures reduce data platform costs 50–70 %","73 % of data duplication eliminated","Query performance matches or exceeds dedicated warehouses"); Tags="Lakehouse,Data Architecture,Delta Lake,Databricks,Analytics"; ReadTime=7 },
        @{ Title="Data Catalog Best Practices: Making Your Data Discoverable"; Slug="data-catalog-best-practices"; Description="A data catalog transforms the search for data from a days-long hunt into a minutes-long discovery — becoming the single most impactful tool for improving data productivity, quality, and governance."; Quote="Before our catalog, analysts spent 2 days finding data for a 2-hour analysis. After implementation, the search takes 10 minutes. The ROI was immediate."; Stats=@("Data catalogs reduce time-to-data by 80 % on average","3× increase in data reuse with catalogues","Documented assets receive 67 % higher quality ratings from consumers"); Tags="Data Catalog,Metadata,Data Discovery,Data Governance,Microsoft Purview"; ReadTime=6 },
        @{ Title="Responsible Data Science: Bias, Fairness, and Ethical AI"; Slug="responsible-data-science"; Description="Data science models built without attention to fairness can perpetuate and amplify historical inequities at unprecedented scale. Explore the frameworks, tools, and practices that make responsible data science achievable in enterprise."; Quote="The most dangerous model isn't the inaccurate one — it's the accurate one that's accurate for the wrong reasons, in ways that hurt real people."; Stats=@("67 % of organisations have experienced fairness issues in AI/ML models","Bias-aware modelling reduces discriminatory outcomes by 78 %","Only 23 % of data science teams systematically test models for bias before deployment"); Tags="Responsible Data Science,AI Fairness,Bias,Ethics,ML"; ReadTime=8 }
    )

    # ── DIGITAL WORKPLACE (20) ─────────────────────────────────────────────
    "Workplace" = @(
        @{ Title="The Hybrid Work Revolution: Designing for Inclusion and Performance"; Slug="hybrid-work-revolution"; Description="Hybrid work isn't a temporary accommodation — it's the permanent new model for knowledge work. Organisations that design their hybrid models intentionally create workplaces where everyone can do their best work, regardless of location."; Quote="The goal of hybrid work isn't to replicate the office at home. It's to give people the freedom to work where they do their best work, on terms that work for them and the organisation."; Stats=@("89 % of employees prefer hybrid working over full-time office or remote","Effective hybrid models see 34 % higher employee retention","Hybrid work expands talent pool by 234 % by removing geographic constraints"); Tags="Hybrid Work,Future of Work,Employee Experience,Microsoft Teams"; ReadTime=7 },
        @{ Title="Microsoft Teams Transformation: From Tool to Digital Headquarters"; Slug="teams-digital-hq"; Description="For many organisations, Microsoft Teams has become more than a communication tool — it's the digital hub where work happens. Organisations that maximise Teams as a platform are experiencing productivity gains far beyond initial expectations."; Quote="Teams changed from 'the place we have video calls' to 'the place we do everything.' That transition transformed how our entire company operates."; Stats=@("Microsoft Teams has 320 million daily active users globally","Organisations maximising Teams as a platform see 45 % process efficiency improvement","Teams-integrated apps reduce context switching by 67 %"); Tags="Microsoft Teams,Digital Workplace,Productivity,Collaboration"; ReadTime=6 },
        @{ Title="Digital Employee Experience: Measuring What Actually Matters"; Slug="digital-employee-experience"; Description="Employee experience in the digital age is determined as much by the quality of tools and technology as by physical workspace. DEX measurement platforms reveal how digital friction affects productivity, wellbeing, and retention."; Quote="We discovered that one poorly performing application was causing 2 hours of productivity loss per employee per week. Fixing it was worth £3.4 M annually."; Stats=@("Digital friction costs organisations £4,800 per employee per year","Organisations measuring DEX see 78 % better tool adoption","Improved digital experience reduces employee attrition by 25 %"); Tags="Digital Employee Experience,DEX,Productivity,Employee Wellbeing"; ReadTime=6 },
        @{ Title="Change Management in Digital Transformation: Winning Hearts and Minds"; Slug="change-management-dx"; Description="Technology is never the reason digital transformations fail. Resistance, poor communication, and inadequate support are. Effective change management bridges the gap between deployment and adoption."; Quote="We deployed the technology in 3 months. It took 18 months to change how people worked. Every lesson pointed to change management as the crucial investment."; Stats=@("70 % of digital transformation initiatives fail to meet objectives","Strong change management makes success 6× more likely","Every £1 in change management returns £6 in faster adoption"); Tags="Change Management,Digital Transformation,Adoption,Leadership"; ReadTime=7 },
        @{ Title="Power Platform: Empowering Citizen Developers to Solve Real Problems"; Slug="power-platform-citizen-dev"; Description="Microsoft Power Platform is enabling non-technical employees to build apps, automate processes, and create reports that previously required developer resources — closing the backlog gap and accelerating innovation."; Quote="Our HR manager built an onboarding automation that saves 8 hours per new hire. IT couldn't have prioritised it in the next 18 months. That's citizen development delivering real value."; Stats=@("Citizen developers outnumber professional developers 10:1 in enterprise","Power Platform saves average 12 hours per employee per month","Citizen development resolves process bottlenecks 5× faster"); Tags="Power Platform,Citizen Development,Low Code,Automation,Microsoft"; ReadTime=6 },
        @{ Title="Knowledge Management: Preserving Institutional Wisdom in the Modern Workplace"; Slug="knowledge-management"; Description="When an experienced employee leaves, they take decades of accumulated knowledge with them. Modern knowledge management systems capture, organise, and surface that wisdom so it becomes a lasting organisational asset."; Quote="We stopped losing knowledge when people left the day we made capturing and sharing knowledge as natural as sending an email."; Stats=@("Employees spend average 2.5 hours daily searching for information","Mature KM practices improve onboarding efficiency by 35 %","Knowledge management reduces problem-solving time by 56 % across the workforce"); Tags="Knowledge Management,SharePoint,Viva Topics,Learning,Collaboration"; ReadTime=6 },
        @{ Title="HR Automation: Freeing People Teams to Focus on People"; Slug="hr-automation"; Description="HR teams drowning in administrative tasks cannot deliver the strategic people experience that drives organisational performance. Process automation frees HR professionals to focus on the high-value, human-centred work."; Quote="We automated 60 % of our HR administrative tasks. Our team now spends that time on coaching, development, and culture. Staff satisfaction improved 45 % in 12 months."; Stats=@("HR automation reduces administrative burden by 60 % on average","Automated onboarding reduces time-to-productivity by 50 %","HR teams with automation spend 3× more time on strategic initiatives"); Tags="HR Automation,People Operations,Onboarding,Process Automation"; ReadTime=6 },
        @{ Title="Workplace Analytics: Using Data to Design Better Ways of Working"; Slug="workplace-analytics"; Description="Microsoft Viva Insights gives organisations unprecedented visibility into collaboration patterns, meeting culture, and work-life balance — enabling evidence-based design of working norms that boost productivity without burnout."; Quote="Workplace analytics showed us that our top performers were the most overloaded with meetings. We fixed the meeting culture and saw 28 % improvement in their output."; Stats=@("Knowledge workers spend 57 % of their time in communication and meetings","Optimised meeting cultures improve individual focus time by 45 %","Workplace analytics programmes see 23 % improvement in employee wellbeing scores"); Tags="Workplace Analytics,Viva Insights,Microsoft 365,Productivity"; ReadTime=6 },
        @{ Title="Digital Onboarding Excellence: Making First Impressions Last"; Slug="digital-onboarding"; Description="The digital onboarding experience shapes whether new hires become engaged, productive team members or disillusioned employees looking for their next opportunity. Best-in-class organisations have cracked the formula."; Quote="Our new hires used to say 'I spent my first week trying to get access to things.' Now they say 'I was making real contributions by day three.' That's digital onboarding done right."; Stats=@("Effective digital onboarding improves first-year retention by 82 %","Best-in-class digital onboarding reduces time-to-productivity by 50 %","Poor onboarding costs £30,000 per employee who leaves in year one"); Tags="Onboarding,Digital Workplace,Employee Experience,Retention"; ReadTime=5 },
        @{ Title="VR in Employee Training: Learning Experiences That Stick"; Slug="vr-employee-training"; Description="VR-based training achieves learning retention rates that traditional methods simply cannot match. By placing employees in immersive, realistic scenarios, VR creates experiential learning that changes behaviour rather than just imparting knowledge."; Quote="We trained 2,000 employees in hazard response scenarios impossible to run in the real world. When a real emergency happened, the response was flawless. VR training saved lives."; Stats=@("VR training improves knowledge retention by 75 % vs traditional methods","Training time reduced 40 % with immersive VR","VR safety training reduces workplace incidents by 67 %"); Tags="Virtual Reality,VR Training,Learning,Employee Development"; ReadTime=6 },
        @{ Title="Digital Leadership Competencies for the Modern Enterprise"; Slug="digital-leadership"; Description="The skills that made leaders successful in the pre-digital era are necessary but no longer sufficient. Digital leadership requires comfort with ambiguity, data literacy, platform thinking, and cultures of continuous experimentation."; Quote="The most important digital leadership skill isn't technical. It's the courage to experiment, the humility to learn from failure, and the decisiveness to act on data."; Stats=@("78 % of organisations cite leadership as the top barrier to digital transformation","Digital-native leaders achieve transformation goals 3× more often","Digital leadership development sees 45 % better transformation outcomes"); Tags="Digital Leadership,Executive Development,Transformation,Skills"; ReadTime=7 },
        @{ Title="Agile Transformation at Enterprise Scale: Beyond the Team Level"; Slug="agile-enterprise-scale"; Description="Agile works brilliantly at team level. Making it work at enterprise scale — across hundreds of teams, complex dependencies, and organisational silos — requires scaling frameworks applied with discipline and contextual judgement."; Quote="When Agile hits the enterprise, it collides with procurement cycles, annual budgets, and siloed organisations. Scaling Agile means changing all of those, not just the teams."; Stats=@("Scaled Agile organisations launch products 3× faster","Enterprise Agile increases team satisfaction by 89 % vs waterfall","Mature Agile practices have 50 % lower project failure rates"); Tags="Agile,SAFe,Scaled Agile,Enterprise,Transformation"; ReadTime=7 },
        @{ Title="Inclusive Technology Design: Building Workplaces That Work for Everyone"; Slug="inclusive-technology-design"; Description="Technology that doesn't work for everyone doesn't work for your organisation. Inclusive design principles ensure digital tools are accessible, equitable, and effective for employees of all abilities, backgrounds, and work styles."; Quote="When we designed for our employees with disabilities, we made the experience better for everyone. Inclusive design isn't a compromise — it's an upgrade."; Stats=@("15 % of the global workforce has some form of disability","Inclusive technology sees 34 % higher overall employee productivity","Accessibility-first organisations achieve 2.3× higher profitability vs peers"); Tags="Inclusive Design,Accessibility,Digital Workplace,Equity"; ReadTime=6 },
        @{ Title="Employee Wellbeing in the Digital Age: Addressing Burnout Proactively"; Slug="employee-wellbeing-digital"; Description="Digital tools can, without careful management, become sources of always-on stress and burnout. Forward-thinking organisations are using technology to actively support wellbeing rather than inadvertently undermine it."; Quote="We use Microsoft Viva to identify wellbeing risks before they become burnout. Our employee NPS has increased 34 points since we started proactive wellbeing management."; Stats=@("Burnout costs organisations £322 billion annually worldwide","Proactive wellbeing programmes see 56 % lower turnover","Digital wellbeing tools reduce burnout risk indicators by 45 %"); Tags="Employee Wellbeing,Burnout,Viva Insights,Mental Health,Work-Life Balance"; ReadTime=6 },
        @{ Title="Smart Office Technology: Designing the Workspace of 2027"; Slug="smart-office-2027"; Description="The office of 2027 adapts to how people work, not the other way around. Smart lighting, AI-optimised layouts, sensor-guided space management, and seamless meeting technology are converging to create genuinely smarter workplaces."; Quote="Our smart office reduces energy by 40 % and increases employee satisfaction by 34 %. The office isn't just a place to work — it's a competitive recruitment tool."; Stats=@("Smart office technology reduces energy costs 30–45 %","Meeting room utilisation improves 67 % with occupancy sensing","Smart offices increase space utilisation by 89 % vs traditional layouts"); Tags="Smart Office,Workplace Technology,IoT,Sustainability,Hybrid Work"; ReadTime=6 },
        @{ Title="Building Digital Skills at Scale: The Learning Transformation"; Slug="digital-skills-scale"; Description="The digital skills gap is widening. Organisations that make systematic, continuous investment in digital capability are creating workforce advantages that competitors find hard to replicate."; Quote="We made learning a daily habit, not an annual training event. Our workforce's digital capability has grown faster in 18 months than in the previous decade."; Stats=@("Digital skills shortages cost organisations £2.2 M annually in lost productivity","Learning cultures have 46 % lower voluntary turnover","Continuous learning programmes improve employee performance by 23 % within 6 months"); Tags="Digital Skills,Learning,Viva Learning,Microsoft 365,Development"; ReadTime=6 },
        @{ Title="Digital Communication Best Practices: Combating Meeting Overload"; Slug="digital-communication-meetings"; Description="The meeting overload epidemic is destroying focus time and burning out knowledge workers. Discover the communication principles, tools, and organisational norms that restore balance between synchronous and asynchronous work."; Quote="We reduced meetings by 40 % and productivity went up, not down. The best meeting is often the one that never happens."; Stats=@("Knowledge workers spend 57 % of their time in meetings and communication","Meeting-free focus time improves complex task completion by 78 %","Async-first communication norms see 45 % higher individual output"); Tags="Communication,Meetings,Productivity,Microsoft Teams,Async Work"; ReadTime=5 },
        @{ Title="Microsoft Viva: Building an Integrated Employee Experience Platform"; Slug="microsoft-viva-platform"; Description="Microsoft Viva brings learning, insights, goals, connections, and wellbeing into a unified platform integrated directly into Microsoft Teams — transforming employee engagement, productivity, and organisational alignment."; Quote="Viva connected our people to our purpose, our peers, and their own performance data in ways no previous platform could. Engagement scores have never been higher."; Stats=@("Microsoft Viva organisations see 34 % improvement in employee engagement","Viva Insights reduces meeting time by 28 % on average","Viva Learning increases training completion rates by 45 %"); Tags="Microsoft Viva,Employee Experience,Learning,Insights,Teams"; ReadTime=6 },
        @{ Title="Remote Work Productivity: What the Data Actually Tells Us"; Slug="remote-work-productivity-data"; Description="Two years of remote work data has revealed surprising truths that challenge many long-held assumptions. This evidence-based analysis separates myth from reality to help organisations make informed decisions about their working models."; Quote="The data doesn't support the narrative that remote workers are less productive. What it shows is that remote work changes what productivity looks like — and most organisations haven't adapted their measurement."; Stats=@("Remote workers report 13 % higher productivity for focused work tasks","Collaboration quality determines remote team effectiveness more than quantity","Organisations measuring output vs presence see 34 % better remote team performance"); Tags="Remote Work,Productivity,Hybrid Work,Data,Future of Work"; ReadTime=7 },
        @{ Title="Copilot for Microsoft 365: The Productivity Revolution Has Arrived"; Slug="copilot-m365-productivity"; Description="Microsoft 365 Copilot is delivering productivity gains that early adopters describe as genuinely transformational — augmenting every aspect of knowledge work from email drafting to meeting summaries to data analysis."; Quote="Copilot gave me back 2 hours a day. I use them to do more strategic work than I've ever had time for before. This is what transformation actually feels like."; Stats=@("Microsoft 365 Copilot users save average 1.2 hours per day","Meeting summary quality improves 89 % with AI-generated notes","Document creation time reduces 67 % with Copilot assistance"); Tags="Microsoft Copilot,M365,AI,Productivity,Future of Work"; ReadTime=5 }
    )

    # ── CYBERSECURITY & DIGITAL TRUST (20) ────────────────────────────────
    "Security" = @(
        @{ Title="Zero Trust Architecture: Never Trust, Always Verify"; Slug="zero-trust-architecture"; Description="The traditional security perimeter has dissolved. Zero Trust replaces 'trust but verify' with 'never trust, always verify' — treating every access request as if it comes from an untrusted network, regardless of origin."; Quote="Zero Trust isn't a product you buy. It's a strategic approach that transforms how you think about identity, access, and the fundamental nature of trust in security."; Stats=@("67 % of organisations have adopted or are implementing Zero Trust","Zero Trust reduces breach damage by 50 % vs perimeter-only models","Mature Zero Trust organisations see 4× reduction in security incidents"); Tags="Zero Trust,Security Architecture,Identity,Azure AD"; ReadTime=8 },
        @{ Title="Identity Is the New Perimeter: Mastering IAM in the Cloud Era"; Slug="identity-new-perimeter"; Description="With workloads spanning cloud, on-premises, and SaaS, identity has become the primary security control plane. Robust IAM built on least privilege, just-in-time access, and continuous verification is the foundation of modern enterprise security."; Quote="80 % of security breaches involve compromised credentials. Fix identity security and you eliminate the most common attack vector in enterprise IT."; Stats=@("80 % of breaches involve compromised or stolen credentials","Mature IAM reduces breach costs by £2.1 M on average","PAM reduces privileged account abuse by 94 %"); Tags="IAM,Identity,Privileged Access,Azure AD,MFA"; ReadTime=7 },
        @{ Title="Threat Intelligence: Knowing Your Enemy Before They Strike"; Slug="threat-intelligence"; Description="Reactive security — waiting for attacks and responding — is a losing strategy. Threat intelligence transforms security from reactive to proactive, giving visibility into threat actor TTPs targeting your industry before attacks materialise."; Quote="With threat intelligence, we knew about the campaign targeting our sector 3 weeks before we were targeted. We had our defences ready. That awareness was worth tens of millions."; Stats=@("Threat intelligence programmes detect breaches 56 days faster","Proactive threat intel reduces incident response costs by 67 %","Average breach cost is £3.9 M — intelligence-driven security reduces this by 45 %"); Tags="Threat Intelligence,Security Operations,SOC,SIEM,Proactive Security"; ReadTime=7 },
        @{ Title="GDPR and Data Privacy Compliance: Building a Sustainable Programme"; Slug="gdpr-privacy-compliance"; Description="GDPR compliance isn't a one-time project — it's an ongoing programme requiring continuous investment in processes, technology, and culture. Organisations that treat privacy as a programme rather than a project build sustainable capabilities."; Quote="The organisations that treat GDPR as a minimum bar are constantly at risk. The ones that treat it as a starting point have built genuine privacy-first cultures."; Stats=@("Average GDPR fine in 2024 was £4.1 M","Mature privacy programmes spend 68 % less on compliance maintenance","Privacy-first organisations see 89 % lower data breach incident rates"); Tags="GDPR,Privacy,Compliance,Data Protection,Regulatory"; ReadTime=7 },
        @{ Title="Ransomware Resilience: Prevention, Detection, and Recovery"; Slug="ransomware-resilience"; Description="Ransomware has evolved from an opportunistic nuisance to a sophisticated, targeted enterprise threat. Organisations that survive attacks share a common trait: they invested in resilience before the attack arrived."; Quote="The question isn't if you'll be targeted by ransomware — it's whether you'll be recoverable. Our resilience programme meant we were back online in 4 hours instead of 4 weeks."; Stats=@("Average ransomware attack costs £4.5 M total including recovery","Organisations with tested recovery restore in hours not weeks","Ransomware attacks increased 300 % in the past two years"); Tags="Ransomware,Backup,Business Continuity,Incident Response"; ReadTime=8 },
        @{ Title="Security Operations Centre: Building Your Cyber Defence Command"; Slug="security-operations-centre"; Description="A mature SOC is the nerve centre of enterprise cyber defence — monitoring threats, investigating incidents, and coordinating response across the entire security estate. This guide covers how to build one that delivers genuine value."; Quote="An SOC without the right processes and people is just expensive technology that generates alerts nobody acts on. The investment is in the model, not just the tools."; Stats=@("Mature SOCs detect breaches 72 days faster","SOC teams using SOAR handle 3× more incidents with same headcount","Mean time to detect: 197 days without SOC, 48 days with mature SOC"); Tags="SOC,Security Operations,SIEM,SOAR,Incident Response"; ReadTime=8 },
        @{ Title="API Security: Protecting Your Digital Front Door"; Slug="api-security"; Description="APIs have become the dominant attack surface in enterprise security. Many organisations have invested heavily in network and endpoint security while leaving API security underfunded — a gap attackers are actively exploiting."; Quote="Every API is a door into your business. Without proper security, you've left the front door open to every bad actor with an internet connection."; Stats=@("94 % of organisations experienced API security incidents in the past year","API attacks increased 400 % in two years","Average data breach via API costs £4.2 M more than other breach types"); Tags="API Security,OWASP,Azure APIM,Application Security,DevSecOps"; ReadTime=6 },
        @{ Title="Cloud Security Architecture: Securing Your Azure Environment"; Slug="cloud-security-architecture"; Description="Cloud security is fundamentally different from on-premises security, yet many organisations apply the same mental models and tools they've always used. This guide covers native Azure controls, patterns, and governance frameworks."; Quote="The cloud doesn't make you less secure. The security mistakes you made on-premises follow you to the cloud unless you use the migration to fix them."; Stats=@("95 % of cloud security failures are customer's fault, not the provider's","Microsoft Defender for Cloud reduces security incidents by 78 %","Organisations using cloud-native controls achieve compliance 60 % faster"); Tags="Cloud Security,Azure Security,Defender,Architecture,Compliance"; ReadTime=7 },
        @{ Title="Cybersecurity Awareness Training: Turning Employees into Your Best Defence"; Slug="security-awareness-training"; Description="Technology alone cannot protect against social engineering attacks that target the human layer. Effective awareness programmes go beyond annual compliance training to create genuine security behaviours that become organisational instincts."; Quote="Our phishing simulation click-through rate went from 34 % to 2 % in 18 months. We didn't change the technology — we changed the culture."; Stats=@("Phishing remains the #1 breach vector at 36 % of all incidents","Well-designed awareness programmes reduce phishing success rates by 94 %","Strong security cultures have 52 % lower breach costs"); Tags="Security Awareness,Phishing,Human Layer,Culture,Training"; ReadTime=6 },
        @{ Title="Incident Response Planning: Preparing for the Breach You Hope Never Happens"; Slug="incident-response-planning"; Description="The time to develop your incident response plan is not during an incident. Organisations with documented, practised, and continuously updated IR plans recover faster, cheaper, and with less reputational damage."; Quote="During a breach, every minute of confusion costs money and exposes data. An incident response plan converts panic into procedure."; Stats=@("Organisations with IR plans reduce breach costs by £1.2 M on average","IR teams with regular tabletop exercises contain breaches 50 % faster","Documented IR procedures reduce compliance penalties by 67 %"); Tags="Incident Response,IR Planning,Breach Response,Business Continuity"; ReadTime=7 },
        @{ Title="Privileged Access Management: Controlling Your Most Dangerous Accounts"; Slug="privileged-access-management"; Description="Privileged accounts represent the highest-value targets for attackers. PAM solutions provide the controls, visibility, and governance needed to eliminate the risk these accounts represent without impeding legitimate administrative work."; Quote="The most dangerous account in your organisation is the one your sysadmin uses without realising how much access it has. PAM makes dangerous accounts visible and controllable."; Stats=@("74 % of breaches involve privileged account compromise","PAM reduces privileged account abuse incidents by 94 %","Organisations using PAM detect insider threats 3× faster"); Tags="PAM,Privileged Access,Identity Security,Zero Trust"; ReadTime=6 },
        @{ Title="Vulnerability Management: A Continuous Risk Reduction Programme"; Slug="vulnerability-management"; Description="Point-in-time security assessments are insufficient against a threat landscape that changes daily. A mature vulnerability management programme continuously discovers, prioritises, and remediates vulnerabilities based on actual exploitability and business risk."; Quote="We stopped treating vulnerability management as an annual audit and started treating it as continuous risk reduction. Our exploitable attack surface has shrunk by 73 %."; Stats=@("Average organisation has 1,097 open critical vulnerabilities","Risk-based prioritisation reduces remediation effort by 60 %","Continuous vulnerability management reduces breach likelihood by 67 %"); Tags="Vulnerability Management,Patching,Risk,Security Posture"; ReadTime=7 },
        @{ Title="Data Loss Prevention: Protecting Your Most Valuable Asset"; Slug="data-loss-prevention"; Description="Data is your most valuable organisational asset — and the most targeted. A comprehensive DLP strategy combining technology, policy, and employee education prevents both malicious exfiltration and inadvertent data loss."; Quote="Most data loss isn't malicious. It's accidental. Building a DLP programme that prevents accidents while catching malice is the challenge and the opportunity."; Stats=@("68 % of data loss incidents are caused by employee error or negligence","DLP programmes reduce insider data loss incidents by 87 %","Average cost of a data breach is £3.9 M — DLP returns 4× ROI in breach prevention"); Tags="DLP,Data Loss Prevention,Insider Threat,Compliance,Security"; ReadTime=6 },
        @{ Title="Network Security Monitoring: Seeing Everything on Your Digital Estate"; Slug="network-security-monitoring"; Description="You can't protect what you can't see. Comprehensive network security monitoring provides the visibility needed to detect threats, investigate anomalies, and demonstrate compliance across increasingly complex hybrid environments."; Quote="We had no idea what was happening on our network until we built visibility. What we found in the first 48 hours was simultaneously reassuring and alarming."; Stats=@("Average attacker spends 197 days in networks before detection","Network monitoring reduces dwell time to under 72 hours","Full network visibility reduces breach impact by 89 %"); Tags="Network Security,NDR,Monitoring,Threat Detection,SIEM"; ReadTime=7 },
        @{ Title="Endpoint Protection Platform: Defending Your Most Exposed Attack Surface"; Slug="endpoint-protection"; Description="Endpoints — laptops, mobile devices, servers — remain the most targeted attack surface in enterprise security. Modern EPP platforms go far beyond traditional antivirus to provide prevention, detection, and response capabilities that match today's threat landscape."; Quote="Our endpoint protection platform caught a nation-state APT that had been dormant in our environment for 6 months. Without behavioural AI, we would never have known."; Stats=@("70 % of successful attacks originate from endpoint compromise","Next-gen EPP platforms detect 94 % of fileless attacks (vs 42 % for legacy AV)","Integrated EDR reduces mean time to respond by 75 %"); Tags="Endpoint Security,EPP,EDR,XDR,Malware Protection"; ReadTime=7 },
        @{ Title="Security by Design: Embedding Security from the First Line of Code"; Slug="security-by-design"; Description="Security vulnerabilities are dramatically cheaper to fix in design than in production. Security by Design embeds security thinking into every stage of the development lifecycle — from architecture to deployment to ongoing operations."; Quote="The cheapest security fix is the one that never ships as a vulnerability. Security by Design is how you achieve that."; Stats=@("Security defects cost 100× more to fix in production than in design","Security by Design reduces post-release vulnerabilities by 89 %","SDLC-integrated security reduces overall security spending by 45 %"); Tags="Security by Design,Secure SDLC,Application Security,DevSecOps"; ReadTime=6 },
        @{ Title="Compliance Automation: Turning Regulatory Burden into Business Advantage"; Slug="compliance-automation"; Description="Manual compliance processes are slow, error-prone, and expensive. Compliance automation platforms continuously assess controls, generate evidence, and produce audit-ready reports — transforming regulatory burden into a demonstrable competitive advantage."; Quote="We went from 6-week compliance audits to continuous compliance attestation. Our last audit was the fastest and cheapest in our company's history."; Stats=@("Compliance automation reduces audit preparation time by 80 %","Continuous compliance monitoring reduces compliance gaps by 73 %","Automated evidence collection saves 2,400 staff hours per audit on average"); Tags="Compliance,Automation,Regulatory,Audit,GRC"; ReadTime=6 },
        @{ Title="Building a Security-First Culture: The Human Firewall"; Slug="security-first-culture"; Description="The most sophisticated technical defences can be undone by a single poorly-trained employee. Building a genuine security-first culture requires leadership commitment, engaging education, and systems that make the secure choice the easy choice."; Quote="A security culture isn't built by fear — it's built by empowerment. When employees understand why security matters and feel equipped to protect it, they become your strongest defence."; Stats=@("Human error contributes to 82 % of all data breaches","Security-first cultures have 67 % lower breach frequency","Employee security NPS above 50 correlates with 78 % fewer successful phishing attacks"); Tags="Security Culture,Awareness,Human Firewall,Change Management"; ReadTime=7 },
        @{ Title="Penetration Testing at Scale: Red Teaming Your Entire Digital Estate"; Slug="penetration-testing-scale"; Description="Periodic penetration tests give you a point-in-time snapshot of your security posture. Continuous red team operations and bug bounty programmes give you a real-time picture — and are increasingly the standard for mature security organisations."; Quote="A pentest tells you where you were vulnerable last quarter. Continuous red teaming tells you where you're vulnerable today."; Stats=@("Organisations with continuous red team programmes detect 89 % more vulnerabilities","Bug bounty programmes deliver 4× ROI vs equivalent internal testing","Average critical finding costs £2.8 M to remediate in production vs £12 K in testing"); Tags="Penetration Testing,Red Team,Bug Bounty,Offensive Security,Vulnerability"; ReadTime=7 },
        @{ Title="Digital Identity Verification: Securing Access in a Passwordless World"; Slug="digital-identity-passwordless"; Description="Passwords are the weakest link in enterprise security, yet billions of them protect critical systems. The passwordless revolution — driven by FIDO2, biometrics, and certificate-based authentication — is finally making it practical to eliminate them entirely."; Quote="The day we eliminated passwords, our helpdesk ticket volume dropped 45 % and our phishing risk dropped to near zero. It's the single best security decision we ever made."; Stats=@("Passwordless authentication eliminates 100 % of password-based phishing risk","Organisations going passwordless see 45 % reduction in identity-related helpdesk tickets","Microsoft reports 99.9 % of compromised accounts had no MFA enabled"); Tags="Passwordless,Identity,MFA,FIDO2,Biometrics,Azure AD"; ReadTime=6 }
    )
}

# ─────────────────────────────────────────────────────────────────────────────
# HELPER FUNCTIONS
# ─────────────────────────────────────────────────────────────────────────────

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logLine   = "[$timestamp][$Level] $Message"
    $logLine | Tee-Object -FilePath $logFile -Append | Write-Host -ForegroundColor $(
        switch ($Level) { "ERROR" { "Red" } "WARN" { "Yellow" } "SUCCESS" { "Green" } default { "Cyan" } }
    )
}

function Get-ArticleContent {
    <#
    Generates rich HTML content for a news article page.
    Returns a hashtable: Section1..Section4 (HTML strings).
    #>
    param(
        [hashtable]$Article,
        [string]$Category
    )

    $title  = $Article.Title
    $quote  = $Article.Quote
    $stats  = $Article.Stats
    $stat1  = if ($stats.Count -gt 0) { $stats[0] } else { "Industry-leading results reported" }
    $stat2  = if ($stats.Count -gt 1) { $stats[1] } else { "Significant cost savings achieved" }
    $stat3  = if ($stats.Count -gt 2) { $stats[2] } else { "Measurable business impact delivered" }

    $categoryLabel = switch ($Category) {
        "AI"        { "Artificial Intelligence & Machine Learning" }
        "Cloud"     { "Cloud & Infrastructure" }
        "Data"      { "Data & Analytics" }
        "Workplace" { "Digital Workplace" }
        "Security"  { "Cybersecurity & Digital Trust" }
        default     { "Digital Transformation" }
    }

    $section1 = @"
<h2>Why This Matters Now</h2>
<p>$categoryLabel is no longer a future consideration — it is a present-day business imperative. Organisations across every sector are discovering that early movers capture disproportionate value, while those who wait face an increasingly steep competitive climb.</p>
<p>The story of <strong>$title</strong> is one of deliberate investment meeting bold execution. The results speak for themselves:</p>
<ul>
  <li>📊 <strong>$stat1</strong></li>
  <li>💡 <strong>$stat2</strong></li>
  <li>🚀 <strong>$stat3</strong></li>
</ul>
<p>These aren't theoretical projections — they are outcomes achieved by real organisations operating in the same competitive environment as your own.</p>
"@

    $section2 = @"
<h2>Strategic Foundations</h2>
<p>Success in this domain doesn't happen by accident. The organisations achieving the most impressive results share a set of common strategic foundations that underpin their $categoryLabel initiatives.</p>
<p>First, they align technology investment to specific, measurable business outcomes — never technology for its own sake. Second, they build cross-functional teams that combine domain expertise with technical capability. Third, they operate in short, iterative cycles that validate assumptions quickly and compound learning over time.</p>
<blockquote style="border-left: 4px solid #0078D4; padding-left: 16px; font-style: italic; color: #444;">
  <p>"$quote"</p>
</blockquote>
<p>This philosophy of evidence-based iteration, combined with executive sponsorship and a genuine commitment to capability building, creates the conditions for transformational rather than incremental impact.</p>
"@

    $section3 = @"
<h2>Implementation Roadmap</h2>
<p>A proven implementation approach consists of four distinct phases:</p>
<ol>
  <li><strong>Discovery &amp; Assessment (Weeks 1–4):</strong> Conduct a comprehensive baseline assessment of current capabilities, identify the highest-value use cases, and define success metrics that connect directly to business KPIs.</li>
  <li><strong>Foundation &amp; Pilot (Months 2–4):</strong> Establish the technical and organisational foundations required for scale. Run a focused pilot against your highest-priority use case with a defined success gate.</li>
  <li><strong>Scale &amp; Optimise (Months 5–12):</strong> Validated by pilot results, expand systematically across the organisation. Establish centres of excellence, build internal capability, and track ROI rigorously.</li>
  <li><strong>Innovate &amp; Extend (Month 12+):</strong> With foundations proven, shift focus to continuous innovation. Use what you've built as a platform for exploring the next generation of capability that your competitors haven't yet imagined.</li>
</ol>
<p>Organisations that follow this structured approach are significantly more likely to achieve their transformation goals and sustain the gains they achieve.</p>
"@

    $section4 = @"
<h2>Key Takeaways &amp; Next Steps</h2>
<p>The evidence is clear: organisations that invest purposefully in $categoryLabel are creating durable competitive advantages that are difficult for competitors to replicate quickly. The window for first-mover advantage is closing, but it remains open for those prepared to act decisively.</p>
<p><strong>Three actions to take in the next 30 days:</strong></p>
<ul>
  <li>✅ <strong>Assess your current maturity</strong> against industry benchmarks to identify your most significant gaps and highest-value opportunities.</li>
  <li>✅ <strong>Identify one high-value use case</strong> where a focused 90-day pilot could demonstrate measurable business impact and build internal momentum.</li>
  <li>✅ <strong>Build your internal coalition</strong> — identify the executive sponsor, the business champion, and the technical lead who will own the initiative and drive it to completion.</li>
</ul>
<p>The organisations featured in our research didn't start with perfect conditions. They started with commitment, clarity of purpose, and the willingness to learn fast. Those same ingredients are available to every organisation ready to embrace the $categoryLabel opportunity.</p>
<p><em>For more insights and implementation guidance, explore the full article series from our $categoryLabel Hub — and connect with our team of specialists to discuss your specific transformation journey.</em></p>
"@

    return @{
        Section1 = $section1
        Section2 = $section2
        Section3 = $section3
        Section4 = $section4
    }
}

function Ensure-ImageFolder {
    param([string]$SiteUrl)
    try {
        # Ensure the SiteAssets document library exists (not present on all site types)
        $lib = Get-PnPList -Identity "SiteAssets" -ErrorAction SilentlyContinue
        if (-not $lib) {
            New-PnPList -Title "Site Assets" -Url "SiteAssets" -Template DocumentLibrary | Out-Null
            Write-Log "Created SiteAssets library on $SiteUrl" "SUCCESS"
        }
        $folder = Get-PnPFolder -Url "$imageFolder" -ErrorAction SilentlyContinue
        if (-not $folder) {
            Resolve-PnPFolder -SiteRelativePath $imageFolder | Out-Null
            Write-Log "Created image folder: $imageFolder" "SUCCESS"
        }
    } catch {
        Write-Log "Could not ensure image folder: $_" "WARN"
    }
}

function Get-HeaderImageUrl {
    <#
    Downloads an Unsplash image to local cache and uploads it to the site's
    SiteAssets/NewsImages folder. Returns the server-relative URL of the
    uploaded image, or $null if upload fails (page is still created, just
    without a custom header image).
    #>
    param(
        [string]$SiteUrl,
        [string]$PhotoId,
        [string]$FileName,
        [string]$SiteRelativePath   # e.g. /sites/AI-Hub
    )

    $localPath = Join-Path $imageCache "$FileName.jpg"

    # Download if not already cached
    if (-not (Test-Path $localPath)) {
        $downloadUrls = @(
            "https://images.unsplash.com/photo-${PhotoId}?w=1200&h=630&fit=crop&auto=format&q=80",
            "https://picsum.photos/1200/630"   # fallback if Unsplash photo ID is dead
        )
        $downloaded = $false
        foreach ($downloadUrl in $downloadUrls) {
            try {
                Write-Log "Downloading image: $FileName ..."
                Invoke-WebRequest -Uri $downloadUrl -OutFile $localPath -TimeoutSec 30 -ErrorAction Stop
                $downloaded = $true
                break
            } catch { }
        }
        if (-not $downloaded) {
            Write-Log "Failed to download image $FileName (all sources failed)" "WARN"
            return $null
        }
    }

    # Upload to SharePoint
    try {
        $uploaded = Add-PnPFile -Path $localPath -Folder $imageFolder -ErrorAction Stop
        $serverRelUrl = "$SiteRelativePath/$imageFolder/$FileName.jpg"
        Write-Log "Uploaded image: $serverRelUrl" "SUCCESS"
        return $serverRelUrl
    } catch {
        Write-Log "Failed to upload image $FileName : $_" "WARN"
        return $null
    }
}

function New-NewsPage {
    <#
    Creates a single SharePoint News Article page with sections,
    header image, metadata, and promotes it as a news post.
    #>
    param(
        [hashtable]$Article,
        [string]$Category,
        [string]$SiteUrl,
        [string]$SiteRelativePath,
        [string]$AuthorName,
        [string]$AuthorRole,
        [string]$HeaderImageUrl   # server-relative URL; may be $null
    )

    $pageName = "$($Article.Slug).aspx"
    $content  = Get-ArticleContent -Article $Article -Category $Category
    $tags     = $Article.Tags

    if ($PSCmdlet.ShouldProcess($SiteUrl, "Create news page: $($Article.Title)")) {
        try {
            # ── Create the page (no header params — version-safe; header set below) ──
            # Delete pre-existing page from a previous failed run before recreating
            try { Remove-PnPPage -Identity $pageName -Force -ErrorAction Stop } catch { }
            $page = Add-PnPPage `
                -Name                 $pageName `
                -Title                $Article.Title `
                -LayoutType           Article `
                -CommentsEnabled:$false `
                -ErrorAction          Stop

            # ── Section 1: Full-width intro ───────────────────────────────
            Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 1 | Out-Null
            Add-PnPPageTextPart -Page $page -Section 1 -Column 1 -Text $content.Section1 -ErrorAction SilentlyContinue

            # ── Section 2: Two columns — body + pull quote ────────────────
            Add-PnPPageSection -Page $page -SectionTemplate TwoColumn -Order 2 | Out-Null
            Add-PnPPageTextPart -Page $page -Section 2 -Column 1 -Text $content.Section2 -ErrorAction SilentlyContinue

            # Author & metadata card in column 2
            $metaHtml = @"
<div style="background:#f3f2f1;padding:20px;border-radius:8px;font-family:Segoe UI,sans-serif;">
  <p style="font-size:13px;color:#888;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px;">Written by</p>
  <p style="font-size:16px;font-weight:600;color:#323130;margin:0 0 2px 0;">$AuthorName</p>
  <p style="font-size:13px;color:#605e5c;margin:0 0 16px 0;">$AuthorRole</p>
  <hr style="border:none;border-top:1px solid #e1dfdd;margin:12px 0;" />
  <p style="font-size:13px;color:#888;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px;">Reading time</p>
  <p style="font-size:14px;color:#323130;margin:0 0 16px 0;">⏱ $($Article.ReadTime) min read</p>
  <hr style="border:none;border-top:1px solid #e1dfdd;margin:12px 0;" />
  <p style="font-size:13px;color:#888;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">Topics</p>
  <p style="font-size:13px;color:#0078D4;margin:0;">$($tags -replace ',', ' &nbsp;·&nbsp; ')</p>
</div>
"@
            Add-PnPPageTextPart -Page $page -Section 2 -Column 2 -Text $metaHtml -ErrorAction SilentlyContinue

            # ── Section 3: Implementation roadmap ────────────────────────
            Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 3 | Out-Null
            Add-PnPPageTextPart -Page $page -Section 3 -Column 1 -Text $content.Section3 -ErrorAction SilentlyContinue

            # ── Section 4: Takeaways (full width) ────────────────────────
            Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 4 | Out-Null
            Add-PnPPageTextPart -Page $page -Section 4 -Column 1 -Text $content.Section4 -ErrorAction SilentlyContinue

            # ── Header / thumbnail image (set after sections so saves don't wipe it) ─
            if ($HeaderImageUrl) {
                try {
                    $freshPage = Get-PnPPage -Identity $pageName -ErrorAction Stop
                    $freshPage.PageHeader.ImageServerRelativeUrl = $HeaderImageUrl
                    $freshPage.Save()
                    Write-Log "Header image set: $HeaderImageUrl" "SUCCESS"
                } catch {
                    Write-Log "Header image not applied: $_" "WARN"
                }
            }

            # ── Promote as News Article ───────────────────────────────────
            try {
                Set-PnPPage `
                    -Identity  $pageName `
                    -PromoteAs NewsArticle `
                    -ErrorAction Stop
            } catch {
                Write-Log "Could not promote page as NewsArticle: $_" "WARN"
            }

            Write-Log "✅ Created: [$Category] $($Article.Title)" "SUCCESS"
            return $true

        } catch {
            Write-Log "❌ Failed to create page '$($Article.Title)': $_" "ERROR"
            return $false
        }
    } else {
        Write-Log "[WhatIf] Would create: [$Category] $($Article.Title)"
        return $true
    }
}

function Ensure-SharePointSites {
    <#
    Creates any of the 5 target sites that don't already exist.
    Connects to the SharePoint admin URL to inspect and provision site collections.
    Each site is created as a Communication Site (Modern, news-ready).
    #>
    Write-Log ""
    Write-Log "──────────────────────────────────────────────────────"
    Write-Log "Phase 0: Provisioning SharePoint sites"
    Write-Log "──────────────────────────────────────────────────────"

    $adminUrl = $TenantUrl -replace 'https://([^.]+)\.sharepoint\.com.*', 'https://$1-admin.sharepoint.com'

    try {
        try { Disconnect-PnPOnline -ErrorAction Stop } catch { }
        if ($ClientId) {
            Connect-PnPOnline -Url $adminUrl -ClientId $ClientId -Interactive -ErrorAction Stop
        } else {
            Connect-PnPOnline -Url $adminUrl -Interactive -ErrorAction Stop
        }
        Write-Log "Connected to admin: $adminUrl" "SUCCESS"
    } catch {
        Write-Log "Could not connect to SharePoint admin ($adminUrl): $_ — skipping site provisioning" "WARN"
        return
    }

    $ownerEmail = $null
    try {
        $currentUser = Get-PnPCurrentUser -ErrorAction Stop
        $ownerEmail  = $currentUser.Email
        Write-Log "Site owner: $ownerEmail" "INFO"
    } catch {
        Write-Log "Could not determine current user email: $_" "WARN"
    }

    foreach ($site in $sites) {
        if ($PSCmdlet.ShouldProcess($site.Url, "Ensure site exists")) {
            try {
                $existing = Get-PnPTenantSite -Url $site.Url -ErrorAction SilentlyContinue
                if ($existing) {
                    Write-Log "Site already exists: $($site.Name) [Status: $($existing.Status)]" "INFO"
                } else {
                    Write-Log "Creating site: $($site.Name) ..." "INFO"
                    $createParams = @{
                        Type        = "CommunicationSite"
                        Title       = $site.Name
                        Url         = $site.Url
                        ErrorAction = "Stop"
                    }
                    if ($ownerEmail) { $createParams["Owner"] = $ownerEmail }
                    New-PnPSite @createParams | Out-Null
                    Write-Log "Site created — waiting for provisioning to complete..." "INFO"

                    # Poll until Active (up to 2 minutes)
                    $retries = 0
                    while ($retries -lt 12) {
                        Start-Sleep -Seconds 10
                        $check = Get-PnPTenantSite -Url $site.Url -ErrorAction SilentlyContinue
                        if ($check -and $check.Status -eq "Active") {
                            Write-Log "✅ Site is Active: $($site.Name)" "SUCCESS"
                            break
                        }
                        $retries++
                        Write-Log "  ...still provisioning ($($retries * 10)s elapsed)" "INFO"
                    }
                }
            } catch {
                Write-Log "Could not provision site '$($site.Name)': $_ — will attempt anyway" "WARN"
            }
        } else {
            Write-Log "[WhatIf] Would create Communication Site: $($site.Name) at $($site.Url)"
        }
    }

    # Disconnect from admin before per-site connections
    try { Disconnect-PnPOnline -ErrorAction Stop } catch { }
}

# ─────────────────────────────────────────────────────────────────────────────
# MAIN EXECUTION
# ─────────────────────────────────────────────────────────────────────────────

# Ensure local image cache folder exists
if (-not $SkipImages) {
    New-Item -ItemType Directory -Path $imageCache -Force | Out-Null
}

Write-Log "════════════════════════════════════════════════════════"
Write-Log "  SharePoint News Showcase — Digital Transformation     "
Write-Log "  100 articles across 5 sites                           "
Write-Log "════════════════════════════════════════════════════════"
Write-Log "Tenant : $TenantUrl"
Write-Log "Log    : $logFile"
Write-Log ""

# Provision any missing sites before attempting page creation
Ensure-SharePointSites

$totalCreated = 0
$totalFailed  = 0
$siteResults  = @()

foreach ($site in $sites) {
    $cat      = $site.Category
    $articles = $articleLibrary[$cat]
    $images   = $categoryImages[$cat]
    $authors  = $categoryAuthors[$cat]
    $sitePath = ($site.Url -replace "^https?://[^/]+", "")  # server-relative site path

    Write-Log ""
    Write-Log "──────────────────────────────────────────────────────"
    Write-Log "Site  : $($site.Name)"
    Write-Log "URL   : $($site.Url)"
    Write-Log "Pages : $($articles.Count)"
    Write-Log "──────────────────────────────────────────────────────"

    # Connect to the site (interactive browser auth)
    try {
        if (-not $PSCmdlet.ShouldProcess($site.Url, "Connect-PnPOnline")) {
            Write-Log "[WhatIf] Would connect to $($site.Url)"
        } else {
            # Disconnect first to clear any cached token (picks up newly-granted scopes)
            try { Disconnect-PnPOnline -ErrorAction Stop } catch { <# no active connection — safe to ignore #> }
            if ($ClientId) {
                Connect-PnPOnline -Url $site.Url -ClientId $ClientId -Interactive -ErrorAction Stop
            } else {
                Connect-PnPOnline -Url $site.Url -Interactive -ErrorAction Stop
            }
            Write-Log "Connected to $($site.Url)" "SUCCESS"
            # Log site template so we can diagnose classic-vs-modern issues
            try {
                $web = Get-PnPWeb -Includes WebTemplate, Configuration -ErrorAction Stop
                Write-Log "Site template: $($web.WebTemplate)#$($web.Configuration)" "INFO"
            } catch {
                Write-Log "Could not read site template: $_" "WARN"
            }

            # Only activate the Site Pages feature if the library is actually missing.
            # Using -Force deactivates then reactivates, destroying the existing library
            # and causing Add-PnPPage to 404 immediately afterward.
            $spLib = Get-PnPList -Identity "Site Pages" -ErrorAction SilentlyContinue
            if ($spLib) {
                Write-Log "Site Pages library confirmed — ready to create pages" "SUCCESS"
            } else {
                Write-Log "Site Pages library missing — activating feature..." "WARN"
                try {
                    Enable-PnPFeature -Identity "B6917CB1-93A0-4B97-A84D-7CF49975D4EC" -Scope Web -ErrorAction Stop
                    Start-Sleep -Seconds 3   # allow SharePoint to finish provisioning
                    $spLib = Get-PnPList -Identity "Site Pages" -ErrorAction SilentlyContinue
                    if ($spLib) {
                        Write-Log "Site Pages feature activated successfully" "SUCCESS"
                    } else {
                        Write-Log "Site Pages library still missing after activation — pages will likely fail on this site" "WARN"
                    }
                } catch {
                    Write-Log "Could not enable Site Pages feature: $_" "WARN"
                }
            }
        }
    } catch {
        Write-Log "Could not connect to $($site.Url): $_  — skipping site." "ERROR"
        $totalFailed += $articles.Count
        continue
    }

    # Ensure image folder exists on this site
    if (-not $SkipImages) {
        Ensure-ImageFolder -SiteUrl $site.Url
    }

    $siteCreated = 0
    $siteFailed  = 0

    for ($i = 0; $i -lt $articles.Count; $i++) {
        $article    = $articles[$i]
        $imageId    = $images[$i % $images.Count]
        $imageName  = "$cat-image-$(($i % $images.Count) + 1)"
        $authorData = $authors[$i % $authors.Count] -split "\|"
        $authorName = $authorData[0]
        $authorRole = $authorData[1]

        Write-Log "Creating ($($i+1)/$($articles.Count)): $($article.Title)"

        $headerUrl = $null
        if (-not $SkipImages) {
            $headerUrl = Get-HeaderImageUrl `
                -SiteUrl         $site.Url `
                -PhotoId         $imageId `
                -FileName        $imageName `
                -SiteRelativePath $sitePath
        }

        $result = New-NewsPage `
            -Article          $article `
            -Category         $cat `
            -SiteUrl          $site.Url `
            -SiteRelativePath $sitePath `
            -AuthorName       $authorName `
            -AuthorRole       $authorRole `
            -HeaderImageUrl   $headerUrl

        if ($result) { $siteCreated++ } else { $siteFailed++ }
    }

    $totalCreated += $siteCreated
    $totalFailed  += $siteFailed
    $siteResults  += [PSCustomObject]@{
        Site    = $site.Name
        Created = $siteCreated
        Failed  = $siteFailed
    }

    Write-Log "Site complete — Created: $siteCreated  Failed: $siteFailed" "SUCCESS"
}

# ─────────────────────────────────────────────────────────────────────────────
# SUMMARY REPORT
# ─────────────────────────────────────────────────────────────────────────────

$elapsed = (Get-Date) - $scriptStart

Write-Log ""
Write-Log "════════════════════════════════════════════════════════"
Write-Log "  SHOWCASE CREATION COMPLETE"
Write-Log "════════════════════════════════════════════════════════"
Write-Log "Total pages created : $totalCreated"
Write-Log "Total failures      : $totalFailed"
Write-Log "Elapsed time        : $($elapsed.ToString('hh\:mm\:ss'))"
Write-Log "Log file            : $logFile"
Write-Log ""
Write-Log "Results by site:"
$siteResults | ForEach-Object {
    Write-Log "  $($_.Site.PadRight(40)) Created: $($_.Created)  Failed: $($_.Failed)"
}
Write-Log ""
Write-Log "Access your showcase sites:"
$sites | ForEach-Object { Write-Log "  $($_.Name): $($_.Url)/SitePages" }
Write-Log "════════════════════════════════════════════════════════"
