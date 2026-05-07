import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Phone, ArrowRight, CheckCircle2, Video, BookOpen, Users, Award,
  HeadphonesIcon, Clock, Calendar, IndianRupee, Quote, Bot, GitBranch,
  FileSearch, Briefcase, Building2, Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import CountdownTimer from "@/components/CountdownTimer";

// ============== CONSTANTS (single source of truth) ==============
const PRICE = "₹24,999";
const COHORT_START_ISO = "2026-06-01T09:00:00+05:30"; // 1 June 2026, 9 AM IST
const COHORT_START_LABEL = "1 June 2026";
const SEATS_REMAINING = 15;
const WA_LINK =
  "https://wa.me/919265802045?text=Hi%20Neural%20Axis%2C%20I%27d%20like%20to%20enroll%20in%20the%20Agentic%20AI%20Engineer%20Bootcamp%20%28%E2%82%B924%2C999%29.%20Please%20share%20payment%20%26%20joining%20details.";

// ============== PHASE DATA (kept verbatim from prior version) ==============
const phases = [
  {
    id: "p1",
    badge: "Phase 1 · Days 1–7",
    title: "Build Your First AI Agent from the Ground Up",
    summary: "Foundations: cloud setup, REST APIs, LLMs, prompts, chatbots, embeddings & vector search.",
    groups: [
      { label: "Cloud & API Foundation", items: ["Configure AWS IAM, S3, and launch your cloud environment", "Initialize Git repos and establish a version-controlled workflow", "Execute and debug Python REST API calls (GET / POST)"] },
      { label: "LLMs & Prompt Engineering", items: ["Understand transformer architecture and how LLMs generate text", "Zero-shot and few-shot prompting strategies via OpenAI / Bedrock API", "Control tone, format, and output structure through prompt design"] },
      { label: "Chatbot Architecture & Memory", items: ["Build a foundational CLI chatbot using structured prompt templates", "Engineer multi-step chains with LangChain", "Implement conversation history so the bot retains prior context"] },
      { label: "Embeddings & Semantic Search", items: ["Generate text embeddings with OpenAI Embeddings / HuggingFace models", "Store and query vectors locally using FAISS", "Build a similarity-search pipeline returning contextually relevant results"] },
    ],
    assessment: { icon: "📋", title: "Assessment 1 — Graded Lab Evaluation", desc: "End-to-end test covering APIs, prompt engineering, and vector search" },
    days: [
      { num: "DAY 1", title: "Cloud Setup & REST APIs", outcome: "Working AWS environment · API calls verified" },
      { num: "DAY 2", title: "LLMs & Prompt Engineering", outcome: "Successful generation with tone and format control" },
      { num: "DAY 3", title: "Basic Chatbot Architecture", outcome: "Functional CLI chatbot with prompt handling" },
      { num: "DAY 4", title: "Chains & Conversational Memory", outcome: "Bot retains and recalls prior context" },
      { num: "DAY 5", title: "Text Embeddings", outcome: "Text tokenized, embedded, and stored locally" },
      { num: "DAY 6", title: "Vector Search & Retrieval", outcome: "Semantic search returning relevant matches" },
      { num: "DAY 7", title: "Assessment 1 & Review", outcome: "Milestone: Foundations evaluated", isAssessment: true },
    ],
    tools: ["AWS IAM", "Python", "OpenAI API", "Bedrock", "LangChain", "FAISS", "HuggingFace"],
    badgeColor: "bg-na-mint-bg text-green-800",
    dotColor: "bg-na-mint",
  },
  {
    id: "p2",
    badge: "Phase 2 · Days 8–14",
    title: "Build a RAG-Powered Multi-Agent System on AWS",
    summary: "Production RAG, AWS Bedrock, LangGraph state machines, multi-agent orchestration.",
    groups: [
      { label: "RAG Pipeline Engineering", items: ["Text chunking strategies for document ingestion and indexing", "Build and tune a retrieval-augmented generation pipeline with LangChain + FAISS", "Reduce hallucinations using custom data and precise retrieval"] },
      { label: "AWS Serverless & Bedrock", items: ["Store datasets in S3 and deploy serverless functions via Lambda", "Expose cloud endpoints with API Gateway", "Access foundation models securely through AWS Bedrock SDK"] },
      { label: "Agentic Reasoning with LangGraph", items: ["Build a basic state-machine agent using LangGraph", "Develop multi-step reasoning agents that break down complex prompts", "Implement tool calling for autonomous decision routing"] },
      { label: "Multi-Agent Systems", items: ["Design specialized agent personas (Planner + Executor pattern)", "Enable agent-to-agent task handoff and collaboration", "Assemble and test a full end-to-end multi-agent pipeline"] },
    ],
    assessment: { icon: "📋", title: "Assessment 2 — Graded Lab Evaluation", desc: "Integrate RAG into a multi-agent framework · full pipeline demo" },
    days: [
      { num: "DAY 8", title: "Build & Tune RAG Pipelines", outcome: "Hallucination-resistant query responses" },
      { num: "DAY 9", title: "AWS Serverless Basics", outcome: "Live serverless endpoint responding to requests" },
      { num: "DAY 10", title: "Bedrock & Basic Agents", outcome: "LangGraph state machine executes tasks" },
      { num: "DAY 11", title: "Multi-Step Reasoning Agents", outcome: "Agent routes workflows autonomously" },
      { num: "DAY 12", title: "Multi-Agent Role Assignment", outcome: "AI personas hand off tasks successfully" },
      { num: "DAY 13", title: "Multi-Agent Orchestration", outcome: "Complex pipeline runs prompt-to-output" },
      { num: "DAY 14", title: "Assessment 2 & Review", outcome: "Milestone: RAG-backed agent demo evaluated", isAssessment: true },
    ],
    tools: ["AWS S3", "Lambda", "API Gateway", "Bedrock SDK", "LangGraph", "Tool Calling", "FAISS"],
    badgeColor: "bg-na-blue-bg text-blue-800",
    dotColor: "bg-na-blue",
  },
  {
    id: "p3",
    badge: "Phase 3 · Days 15–21",
    title: "Deploy a Full-Stack AI Application to the Cloud",
    summary: "Evaluation, guardrails, FastAPI + React, Docker, EC2/Lambda deployment.",
    groups: [
      { label: "LLM Evaluation & Safety", items: ["Implement custom accuracy metrics and hallucination tracking", "Add input/output safety filters using NeMo Guardrails", "Validate structured outputs with JSON Schema enforcement"] },
      { label: "Persistent Memory & Streaming", items: ["Connect vector databases for long-term personalised user memory", "Stream tokens to the console in real time via Python streaming", "Force agents to return strict JSON and call external REST APIs"] },
      { label: "Full-Stack Application Build", items: ["Build a FastAPI backend to serve the AI model as a REST service", "Connect a React / HTML frontend with fetch API calls", "Complete local full-stack app: frontend ↔ backend ↔ AI logic"] },
      { label: "Containerisation & Cloud Deployment", items: ["Write Dockerfiles to package the AI app and all dependencies", "Push the containerised stack to AWS EC2 / Lambda", "Application live via public IP/URL, stable and accessible"] },
    ],
    assessment: { icon: "📋", title: "Assessment 3 — Graded Lab Evaluation", desc: "End-to-end evaluation of the deployed AI stack on AWS" },
    days: [
      { num: "DAY 15", title: "LLM Evaluation & Guardrails", outcome: "Hallucination metrics + safety layer active" },
      { num: "DAY 16", title: "Tool-Using & Structured Output", outcome: "Agent pulls live data in strict JSON" },
      { num: "DAY 17", title: "Persistent Memory & Streaming", outcome: "Real-time generation with context recall" },
      { num: "DAY 18", title: "FastAPI Backend & React UI", outcome: "Full-stack app: frontend connected to AI" },
      { num: "DAY 19", title: "Docker Containerisation", outcome: "Containerised app running on localhost" },
      { num: "DAY 20", title: "AWS EC2 / Lambda Deployment", outcome: "Application live on public URL" },
      { num: "DAY 21", title: "Assessment 3 & Review", outcome: "Milestone: Cloud-deployed app tested", isAssessment: true },
    ],
    tools: ["FastAPI", "React", "Docker", "AWS EC2", "Vector DB", "NeMo", "LangGraph"],
    badgeColor: "bg-na-sand text-amber-800",
    dotColor: "bg-amber-400",
  },
  {
    id: "p4",
    badge: "Phase 4 · Days 22–28",
    title: "Capstone Project — Ship a Portfolio-Ready AI Product",
    summary: "Real problem, production RAG + agents, full-stack UI, GitHub-ready, live demo.",
    groups: [
      { label: "Scope, Architecture & Data", items: ["Define a real-world problem statement and design the data flow", "Clean and pipeline project datasets using Pandas + S3", "Produce an approved system design document"] },
      { label: "Production RAG & Agent Workflows", items: ["Configure a production LLM (Bedrock / OpenAI) with Pinecone or FAISS", "Build customised LangGraph logic for your capstone agent", "Expose core workflows via FastAPI + AWS Lambda endpoints"] },
      { label: "UI Integration & Optimisation", items: ["Develop the final React / HTML UI linked to the cloud backend", "Debug edge cases, profile latency, and stabilise the system", "Set up logging and basic AWS monitoring dashboards"] },
      { label: "Cloud Scaling & Documentation", items: ["Finalise live AWS deployments with scaling configuration", "Publish a professional README and push to GitHub", "Prepare a 10-minute capstone presentation and live demo"] },
    ],
    assessment: { icon: "🏆", title: "Assessment 4 + Final Project Demo", desc: "Defend your architecture, codebase, and live deployment — Day 28" },
    days: [
      { num: "DAY 22", title: "Scope, Architecture & Data", outcome: "Approved design doc + pipeline-ready dataset" },
      { num: "DAY 23", title: "Embeddings & RAG Integration", outcome: "Retrieval mechanism live with capstone data" },
      { num: "DAY 24", title: "Agent Workflows & API Dev", outcome: "Core agentic workflows + API endpoints ready" },
      { num: "DAY 25", title: "UI & Full System Integration", outcome: "Seamless frontend ↔ backend ↔ AI pipeline" },
      { num: "DAY 26", title: "Optimisation & Assessment 4", outcome: "Milestone: Production-ready, edge cases handled", isAssessment: true },
      { num: "DAY 27", title: "Cloud Scaling & Documentation", outcome: "Live app + professional README on GitHub" },
      { num: "DAY 28", title: "Final Project Demo & Review", outcome: "Capstone defended — portfolio ready", isAssessment: true },
    ],
    tools: ["Bedrock", "Pinecone", "LangGraph", "FastAPI", "React", "AWS EC2", "GitHub", "Docker"],
    badgeColor: "bg-na-blue-bg text-na-navy",
    dotColor: "bg-na-navy",
  },
];

// ============== TESTIMONIALS ==============
const testimonials = [
  {
    quote: "Within 28 days I went from struggling with prompt engineering to deploying a multi-agent RAG system on AWS. The hands-on capstone is what made it stick.",
    name: "Aditya Kulkarni",
    role: "ML Engineer",
    org: "Bootcamp Cohort 2",
  },
  {
    quote: "The instructor's approach of teaching production-grade workflows from day one was different from any course I've taken. Got a job offer the week after the demo.",
    name: "Pooja Reddy",
    role: "AI Engineer @ Capgemini",
    org: "Bootcamp Cohort 1",
  },
  {
    quote: "Best part was the daily assessments — you actually know whether you're keeping up. The Slack community is still active 4 months later.",
    name: "Rahul Mehta",
    role: "Software Developer",
    org: "Bootcamp Cohort 2",
  },
];

// ============== CAPSTONE PROJECTS (showcase) ==============
const capstones = [
  {
    icon: Bot,
    title: "Enterprise RAG Customer-Support Bot",
    student: "Cohort 2 capstone",
    tech: ["LangChain", "Pinecone", "FastAPI", "AWS Lambda"],
    desc: "Document-grounded Q&A bot trained on 12k pages of internal docs. Sub-2s p95 latency.",
  },
  {
    icon: GitBranch,
    title: "Agentic Research Assistant",
    student: "Cohort 1 capstone",
    tech: ["LangGraph", "OpenAI", "Tool calling", "Streamlit"],
    desc: "Multi-step planner+executor agent that scrapes the web, summarises, and emails reports.",
  },
  {
    icon: FileSearch,
    title: "Resume → Job Match Engine",
    student: "Cohort 2 capstone",
    tech: ["Embeddings", "FAISS", "React", "Docker"],
    desc: "Semantic resume ranker scoring 5k+ resumes per minute against a JD.",
  },
];

// ============== INSTRUCTOR ==============
const instructor = {
  name: "Raj Yadav",
  title: "Lead Instructor · Data Science & AI Expert",
  location: "Gujarat, India",
  bio: "8+ years building production ML systems and training enterprise AI teams. Combines hands-on engineering experience with structured curriculum design — every module reflects what real teams ship at IBM, TCS and Wipro.",
  credentials: [
    "Microsoft & Columbia University certified in AI/ML",
    "deeplearning.ai Deep Learning Specialization",
    "Trained 500+ engineers across IBM, TCS, Wipro, Capgemini",
    "Built production ML at CapitaWorld (Caffe, TensorFlow, audio analysis)",
  ],
  companies: [
    { role: "Data Science & AI Trainer", company: "Synergistic Compusoft Pvt. Ltd." },
    { role: "Delivery Consultant", company: "TalentSprint, Hyderabad" },
    { role: "Senior Technical Trainer", company: "TOPS Technologies, Surat" },
    { role: "ML Engineer", company: "CapitaWorld, Ahmedabad" },
  ],
};

// ============== UI: PHASE ACCORDION CARD ==============
function PhaseAccordionItem({ phase }) {
  return (
    <AccordionItem
      value={phase.id}
      className="border border-[rgba(15,23,42,0.08)] bg-white rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
      data-testid={`phase-${phase.id}`}
    >
      <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#FAFAFA] [&>svg]:text-na-text-sec">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-left flex-1">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit ${phase.badgeColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${phase.dotColor}`} />
            {phase.badge}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-base sm:text-lg font-medium text-na-text leading-snug">{phase.title}</h3>
            <p className="text-xs text-na-text-sec mt-1 line-clamp-1">{phase.summary}</p>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-7">
        <div className="grid lg:grid-cols-2 gap-8 pt-2">
          {/* Topics */}
          <div className="space-y-5">
            {phase.groups.map((g) => (
              <div key={g.label}>
                <p className="text-sm font-semibold text-na-text mb-2">{g.label}</p>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-na-text-sec leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full ${phase.dotColor} mt-2 flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[#FAFAFA] border border-[rgba(15,23,42,0.05)]">
              <span className="text-lg">{phase.assessment.icon}</span>
              <div>
                <p className="text-sm font-semibold text-na-text">{phase.assessment.title}</p>
                <p className="text-xs text-na-text-sec mt-0.5">{phase.assessment.desc}</p>
              </div>
            </div>
          </div>

          {/* Day-by-day */}
          <div>
            <div className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white p-5">
              <div className="space-y-0">
                {phase.days.map((d) => (
                  <div
                    key={d.num}
                    className={`flex items-start gap-3 py-3 border-b border-[rgba(15,23,42,0.04)] last:border-0 ${d.isAssessment ? "bg-na-mint-bg/30 -mx-2 px-2 rounded-lg" : ""}`}
                  >
                    <span className="text-[11px] font-bold text-na-navy tracking-wide whitespace-nowrap w-12 pt-0.5">{d.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-na-text">{d.title}</p>
                      <p className="text-xs text-na-text-sec mt-0.5">{d.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[rgba(15,23,42,0.06)]">
                {phase.tools.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#FAFAFA] border border-[rgba(15,23,42,0.08)] text-na-text-sec">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ============== PAGE ==============
export default function AgenticAICoursePage() {
  const scrollToEnroll = () => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#FAFAFA]" data-testid="agentic-ai-course-page">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="agentic-nav-logo">
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">Neural Axis Learning Solution</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="tel:+919265802045" className="hidden sm:flex items-center gap-1.5 text-sm text-na-text-sec hover:text-na-text">
              <Phone className="w-3.5 h-3.5" /> +91 9265 802 045
            </a>
            <span className="hidden md:inline text-sm font-semibold text-na-navy">{PRICE}</span>
            <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-5 sm:px-6 text-sm" data-testid="agentic-nav-cta">
              Enroll Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden" data-testid="agentic-hero">
        <div className="absolute top-0 left-0 w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(165,223,178,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[35%] h-[50%] bg-[radial-gradient(circle,rgba(138,180,248,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-5">Cohort-Based Bootcamp · Live Online</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium text-na-text leading-[1.1] mb-7">
              Learn by Doing.<br />
              <em className="text-na-navy not-italic">Become an Agentic AI Engineer.</em>
            </h1>
            <p className="text-base text-na-text-sec max-w-2xl mx-auto mb-8">
              28 days, 4 graded assessments, 1 production-ready capstone — go from prompts to deploying multi-agent systems on AWS.
            </p>

            {/* Price + Cohort Card */}
            <div className="inline-flex flex-wrap items-stretch gap-0 rounded-2xl bg-white border border-[rgba(15,23,42,0.1)] shadow-sm overflow-hidden mb-7" data-testid="hero-price-card">
              <div className="px-6 py-4 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-na-text-sec mb-1">Investment</p>
                <p className="font-heading text-2xl font-medium text-na-navy flex items-center gap-1">
                  <IndianRupee className="w-5 h-5" /> 24,999
                </p>
                <p className="text-[11px] text-na-text-sec mt-0.5">One-time · Lifetime access</p>
              </div>
              <div className="border-l border-[rgba(15,23,42,0.08)] px-6 py-4 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-na-text-sec mb-1">Next Cohort</p>
                <p className="font-heading text-2xl font-medium text-na-text flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-na-text-sec" /> {COHORT_START_LABEL}
                </p>
                <p className="text-[11px] text-na-text-sec mt-0.5">Only {SEATS_REMAINING} seats remaining</p>
              </div>
            </div>

            {/* Live countdown */}
            <div className="flex flex-col items-center gap-3 mb-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-na-text-sec">Cohort starts in</p>
              <CountdownTimer targetDate={COHORT_START_ISO} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" data-testid="hero-enroll-cta">
                <Button className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-7 py-6 text-sm font-medium">
                  Reserve Your Seat — {PRICE} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={scrollToEnroll}
                className="rounded-full px-7 py-6 text-sm font-medium border-[rgba(15,23,42,0.15)]"
                data-testid="hero-curriculum-cta"
              >
                See full curriculum
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-na-text-sec mt-9">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> 28 Days · 6 hrs/day</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> 4 Graded Assessments</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Live + Recordings</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Capstone on AWS</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]" data-testid="instructor-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Who's teaching</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
              Meet your instructor
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl bg-gradient-to-br from-na-navy to-[#122850] p-8 text-white shadow-md">
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                  <span className="font-heading text-2xl font-medium">RY</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-1">{instructor.name}</h3>
                <p className="text-sm text-white/70 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> {instructor.title}
                </p>
                <p className="text-xs text-white/50 mb-5">{instructor.location}</p>
                <p className="text-sm text-white/80 leading-relaxed mb-6">{instructor.bio}</p>
                <div className="space-y-2">
                  {instructor.credentials.map((c) => (
                    <div key={c} className="flex items-start gap-2 text-xs text-white/85">
                      <Award className="w-3.5 h-3.5 text-na-mint flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h3 className="font-heading text-base font-medium text-na-text mb-5">Professional journey</h3>
              <div className="space-y-3">
                {instructor.companies.map((c, i) => (
                  <div
                    key={c.company}
                    className="p-5 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                    data-testid={`instructor-company-${i}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-na-mint-bg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-na-navy" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-medium text-na-text">{c.role}</p>
                      <p className="text-xs text-na-text-sec">{c.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum (accordion) */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">28-Day Curriculum</span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-3">
            Course Outline <em className="not-italic text-na-text-sec font-normal text-xl sm:text-2xl">(Click to expand)</em>
          </h2>
          <p className="text-base text-na-text-sec">Four phases. Real tools. Production deployments.</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Accordion type="single" collapsible defaultValue="p1" className="space-y-3" data-testid="phases-accordion">
            {phases.map((phase) => (
              <PhaseAccordionItem key={phase.id} phase={phase} />
            ))}
          </Accordion>

          <div className="mt-10 text-center py-8 rounded-2xl bg-na-mint-bg/40 border border-na-mint/20">
            <p className="text-base text-na-text mb-1 font-medium">Ready to build production AI agents?</p>
            <p className="text-sm text-na-text-sec mb-5">{PRICE} · Cohort starts {COHORT_START_LABEL}</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-5 text-sm font-medium" data-testid="mid-cta">
                Reserve Your Seat <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-xs text-na-text-sec/60 mt-3">Only {SEATS_REMAINING} seats per cohort</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]" data-testid="course-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Student outcomes</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
              What past cohorts say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                data-testid={`student-testimonial-${i}`}
              >
                <Quote className="w-6 h-6 text-na-mint mb-4" />
                <p className="text-sm leading-relaxed text-na-text-sec mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-medium text-na-text">{t.name}</p>
                  <p className="text-xs text-na-text-sec">{t.role}</p>
                  <p className="text-xs text-na-text-sec font-medium">{t.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone showcase */}
      <section className="py-16 lg:py-20 bg-white" data-testid="capstone-showcase">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Capstone showcase</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-3">
              What our students ship
            </h2>
            <p className="text-base text-na-text-sec max-w-2xl mx-auto">
              Every cohort ends with a portfolio-ready project deployed to AWS — code on GitHub, live demo in front of the cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {capstones.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FAFAFA] hover:-translate-y-1 hover:shadow-sm transition-all duration-300"
                data-testid={`capstone-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-4 border border-[rgba(15,23,42,0.06)]">
                  <c.icon className="w-5 h-5 text-na-navy" />
                </div>
                <h3 className="font-heading text-base font-medium text-na-text mb-1">{c.title}</h3>
                <p className="text-[11px] text-na-text-sec mb-4">{c.student}</p>
                <p className="text-sm text-na-text-sec mb-4 leading-relaxed">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-white border border-[rgba(15,23,42,0.06)] text-na-text-sec">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-na-text-sec/70">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub link shared in cohort</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]" data-testid="what-youll-get">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">What's included</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
              Everything you need to ship
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Video, title: "Live & Interactive Sessions", desc: "6 hours/day of hands-on, instructor-led training. Ask questions, get real-time feedback, code along." },
              { icon: BookOpen, title: "Complete Course Material", desc: "Slides, code repositories, project templates, and reference docs — yours to keep forever." },
              { icon: Users, title: "Peer Learning Community", desc: "Join a cohort of motivated learners. Collaborate on projects, share insights, build your network." },
              { icon: Award, title: "Certificate of Completion", desc: "Industry-recognized certificate showcasing your Agentic AI engineering skills. LinkedIn-ready." },
              { icon: HeadphonesIcon, title: "30-Day Post-Training Support", desc: "Doubt resolution, project guidance, and career advice for 30 days after the bootcamp ends." },
              { icon: Clock, title: "Lifetime Access to Recordings", desc: "Missed a session? All live classes are recorded. Revisit any module anytime." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-7 rounded-xl bg-white border border-[rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                data-testid={`get-card-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-na-mint-bg flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-na-navy" />
                </div>
                <h3 className="font-heading text-base font-medium text-na-text mb-2">{item.title}</h3>
                <p className="text-sm text-na-text-sec leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Enroll CTA */}
      <section id="enroll" className="py-20 lg:py-24 bg-na-navy text-white" data-testid="agentic-enroll-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-3xl mb-4">🏆</p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium mb-4">
              Ready to become an Agentic AI Engineer?
            </h2>
            <p className="text-base text-white/60 mb-7 max-w-xl mx-auto">
              28 days from zero to deploying production AI agents on AWS. {PRICE} · Cohort starts {COHORT_START_LABEL}.
            </p>

            <div className="flex justify-center mb-8">
              <CountdownTimer targetDate={COHORT_START_ISO} />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              <span className="text-sm font-medium text-white/90">Only {SEATS_REMAINING} seats remaining</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-na-mint hover:bg-na-mint/90 text-na-navy rounded-full px-8 py-6 text-sm font-semibold" data-testid="agentic-enroll-whatsapp">
                  Enroll Now — {PRICE}
                </Button>
              </a>
              <a href="tel:+919265802045">
                <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-enroll-call">
                  <Phone className="w-4 h-4 mr-2" /> +91 9265 802 045
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky mobile bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[rgba(15,23,42,0.08)] px-4 py-3 flex items-center justify-between gap-3 lg:hidden shadow-[0_-4px_16px_rgba(15,23,42,0.06)]"
        data-testid="sticky-mobile-bar"
      >
        <div>
          <p className="text-[11px] text-na-text-sec">{COHORT_START_LABEL} cohort</p>
          <p className="font-heading text-base font-medium text-na-navy">{PRICE}</p>
        </div>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
          <Button className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-5 py-2.5 text-sm" data-testid="sticky-mobile-cta">
            Enroll <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </a>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-na-navy border-t border-white/10 text-center pb-24 lg:pb-8">
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">← Back to Homepage</Link>
          <Link to="/courses/generative-ai" className="text-sm text-white/40 hover:text-white/60 transition-colors">Other Courses</Link>
        </div>
      </footer>
    </div>
  );
}
