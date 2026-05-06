import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Clock, Users, Calendar, CheckCircle2, Phone, Mail, BookOpen, Cloud, Brain, Rocket, Trophy, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const phases = [
  {
    phase: "Phase 1",
    days: "Days 1–7",
    title: "Build Your First AI Agent from the Ground Up",
    modules: [
      {
        name: "Cloud & API Foundation",
        topics: ["Configure AWS IAM, S3, and launch your cloud environment", "Initialize Git repos and establish version-controlled workflow", "Execute and debug Python REST API calls (GET / POST)"],
      },
      {
        name: "LLMs & Prompt Engineering",
        topics: ["Understand transformer architecture and how LLMs generate text", "Zero-shot and few-shot prompting via OpenAI / Bedrock API", "Control tone, format, and output structure through prompt design"],
      },
      {
        name: "Chatbot Architecture & Memory",
        topics: ["Build a foundational CLI chatbot using structured prompt templates", "Engineer multi-step chains with LangChain", "Implement conversation history so the bot retains prior context"],
      },
      {
        name: "Embeddings & Semantic Search",
        topics: ["Generate text embeddings with OpenAI / HuggingFace models", "Store and query vectors locally using FAISS", "Build a similarity-search pipeline returning contextually relevant results"],
      },
    ],
    tech: ["AWS IAM", "Python", "OpenAI API", "Bedrock", "LangChain", "FAISS", "HuggingFace"],
    color: "bg-na-mint-bg",
  },
  {
    phase: "Phase 2",
    days: "Days 8–14",
    title: "Build a RAG-Powered Multi-Agent System on AWS",
    modules: [
      {
        name: "RAG Pipeline Engineering",
        topics: ["Text chunking strategies for document ingestion and indexing", "Build and tune a RAG pipeline with LangChain + FAISS", "Reduce hallucinations using custom data and precise retrieval"],
      },
      {
        name: "AWS Serverless & Bedrock",
        topics: ["Store datasets in S3 and deploy serverless functions via Lambda", "Expose cloud endpoints with API Gateway", "Access foundation models through AWS Bedrock SDK"],
      },
      {
        name: "Agentic Reasoning with LangGraph",
        topics: ["Build a basic state-machine agent using LangGraph", "Develop multi-step reasoning agents for complex prompts", "Implement tool calling for autonomous decision routing"],
      },
      {
        name: "Multi-Agent Systems",
        topics: ["Design specialized agent personas (Planner + Executor pattern)", "Enable agent-to-agent task handoff and collaboration", "Assemble and test a full end-to-end multi-agent pipeline"],
      },
    ],
    tech: ["AWS S3", "Lambda", "API Gateway", "Bedrock SDK", "LangGraph", "Tool Calling", "FAISS"],
    color: "bg-na-blue-bg",
  },
  {
    phase: "Phase 3",
    days: "Days 15–21",
    title: "Deploy a Full-Stack AI Application to the Cloud",
    modules: [
      {
        name: "LLM Evaluation & Safety",
        topics: ["Implement custom accuracy metrics and hallucination tracking", "Add input/output safety filters using NeMo Guardrails", "Validate structured outputs with JSON Schema enforcement"],
      },
      {
        name: "Persistent Memory & Streaming",
        topics: ["Connect vector databases for long-term personalized memory", "Stream tokens in real time via Python streaming", "Force agents to return strict JSON and call external REST APIs"],
      },
      {
        name: "Full-Stack Application Build",
        topics: ["Build a FastAPI backend to serve AI model as REST service", "Connect a React frontend with fetch API calls", "Complete local full-stack app: frontend ↔ backend ↔ AI logic"],
      },
      {
        name: "Containerisation & Cloud Deployment",
        topics: ["Write Dockerfiles to package the AI app and all dependencies", "Push the containerized stack to AWS EC2 / Lambda", "Application live via public IP/URL, stable and accessible"],
      },
    ],
    tech: ["FastAPI", "React", "Docker", "AWS EC2", "Vector DB", "NeMo", "LangGraph"],
    color: "bg-na-sand",
  },
  {
    phase: "Phase 4",
    days: "Days 22–28",
    title: "Capstone Project — Ship a Portfolio-Ready AI Product",
    modules: [
      {
        name: "Scope, Architecture & Data",
        topics: ["Define a real-world problem statement and design data flow", "Clean and pipeline project datasets using Pandas + S3", "Produce an approved system design document"],
      },
      {
        name: "Production RAG & Agent Workflows",
        topics: ["Configure production LLM (Bedrock / OpenAI) with Pinecone or FAISS", "Build customized LangGraph logic for capstone agent", "Expose core workflows via FastAPI + AWS Lambda endpoints"],
      },
      {
        name: "UI Integration & Optimisation",
        topics: ["Develop final React UI linked to the cloud backend", "Debug edge cases, profile latency, and stabilize the system", "Set up logging and basic AWS monitoring dashboards"],
      },
      {
        name: "Cloud Scaling & Documentation",
        topics: ["Finalize live AWS deployments with scaling configuration", "Publish professional README and push to GitHub", "Prepare 10-minute capstone presentation and live demo"],
      },
    ],
    tech: ["Bedrock", "Pinecone", "LangGraph", "FastAPI", "React", "AWS EC2", "GitHub", "Docker"],
    color: "bg-na-mint-bg",
  },
];

const highlights = [
  "28-day intensive, hands-on bootcamp",
  "6 hours/day — learn by doing",
  "21 days core training + 7 days capstone",
  "4 graded assessments + final project demo",
  "Ship a portfolio-ready AI product on AWS",
  "Production deployment on Day 28",
];

const daySchedule = [
  { day: "1", title: "Cloud Setup & REST APIs" },
  { day: "2", title: "LLMs & Prompt Engineering" },
  { day: "3", title: "Basic Chatbot Architecture" },
  { day: "4", title: "Chains & Conversational Memory" },
  { day: "5", title: "Text Embeddings" },
  { day: "6", title: "Vector Search & Retrieval" },
  { day: "7", title: "Assessment 1 & Review" },
  { day: "8", title: "Build & Tune RAG Pipelines" },
  { day: "9", title: "AWS Serverless Basics" },
  { day: "10", title: "Bedrock & Basic Agents" },
  { day: "11", title: "Multi-Step Reasoning Agents" },
  { day: "12", title: "Multi-Agent Role Assignment" },
  { day: "13", title: "Multi-Agent Orchestration" },
  { day: "14", title: "Assessment 2 & Review" },
  { day: "15", title: "LLM Evaluation & Guardrails" },
  { day: "16", title: "Tool-Using & Structured Output" },
  { day: "17", title: "Persistent Memory & Streaming" },
  { day: "18", title: "FastAPI Backend & React UI" },
  { day: "19", title: "Docker Containerisation" },
  { day: "20", title: "AWS EC2 / Lambda Deployment" },
  { day: "21", title: "Assessment 3 & Review" },
  { day: "22", title: "Scope, Architecture & Data" },
  { day: "23", title: "Embeddings & RAG Integration" },
  { day: "24", title: "Agent Workflows & API Dev" },
  { day: "25", title: "UI & Full System Integration" },
  { day: "26", title: "Optimisation & Assessment 4" },
  { day: "27", title: "Cloud Scaling & Documentation" },
  { day: "28", title: "Final Project Demo" },
];

export default function AgenticAICoursePage() {
  const scrollToEnroll = () => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white" data-testid="agentic-ai-course-page">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="agentic-nav-logo">
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">Neural Axis</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="tel:+919265802045" className="hidden sm:flex items-center gap-1.5 text-sm text-na-text-sec hover:text-na-text">
              <Phone className="w-3.5 h-3.5" /> +91 9265 802 045
            </a>
            <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-6 text-sm" data-testid="agentic-nav-cta">
              Enroll Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden gradient-spot-mint gradient-spot-blue" data-testid="agentic-hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-na-blue-bg text-xs font-semibold text-na-navy mb-6">
              <Rocket className="w-3.5 h-3.5" /> Cohort-Based Bootcamp — Limited Seats
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium text-na-text leading-[1.1] mb-4 max-w-4xl">
              Learn by Doing.<br />
              <span className="text-na-navy">Become an Agentic AI Engineer.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-na-text-sec max-w-2xl mb-8">
              A 28-day intensive bootcamp — from your first AI agent to deploying a production-grade, 
              multi-agent system on AWS. Four phases. Real tools. Production deployments.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Clock className="w-4 h-4 text-na-navy" /> 28 Days
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <BookOpen className="w-4 h-4 text-na-navy" /> 6 Hours / Day
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Users className="w-4 h-4 text-na-navy" /> 21 Days Core + 7 Days Capstone
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Trophy className="w-4 h-4 text-na-navy" /> 4 Assessments + Final Demo
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-hero-cta">
                Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href="tel:+919265802045">
                <Button variant="outline" className="rounded-full px-8 py-6 text-sm font-medium border-[rgba(15,23,42,0.15)]" data-testid="agentic-hero-call">
                  <Phone className="w-4 h-4 mr-2" /> Call for Details
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-[rgba(15,23,42,0.06)]">
                <CheckCircle2 className="w-5 h-5 text-na-mint flex-shrink-0" />
                <span className="text-sm text-na-text">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases - Detailed Syllabus */}
      <section className="py-20 lg:py-24 bg-white" data-testid="agentic-syllabus">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Course Outline</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-4">
              Project-Based Learning
            </h2>
            <p className="text-base leading-relaxed text-na-text-sec max-w-2xl mb-16">
              Four phases. Real tools. Production deployments. Every day builds on the last — 
              culminating in a portfolio-ready AI product you deploy to AWS.
            </p>
          </motion.div>

          <div className="space-y-12">
            {phases.map((phase, phaseIdx) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: phaseIdx * 0.05 }}
                className={`rounded-2xl border border-[rgba(15,23,42,0.08)] overflow-hidden`}
                data-testid={`phase-${phaseIdx + 1}`}
              >
                {/* Phase Header */}
                <div className={`${phase.color} px-8 py-6 border-b border-[rgba(15,23,42,0.06)]`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-na-text-sec">{phase.phase} · {phase.days}</span>
                      <h3 className="font-heading text-xl sm:text-2xl font-medium text-na-text mt-1">{phase.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/80 border border-[rgba(15,23,42,0.08)] text-na-text-sec">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  {phase.modules.map((mod) => (
                    <div key={mod.name}>
                      <h4 className="font-heading text-base font-medium text-na-text mb-3">{mod.name}</h4>
                      <ul className="space-y-2">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2 text-sm text-na-text-sec">
                            <div className="w-1.5 h-1.5 rounded-full bg-na-mint mt-1.5 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-by-Day Schedule */}
      <section className="py-20 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Schedule</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-12">
              28-Day Roadmap
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {daySchedule.map((d) => (
              <div
                key={d.day}
                className={`p-3 rounded-lg border border-[rgba(15,23,42,0.06)] bg-white text-center hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ${
                  d.day === "7" || d.day === "14" || d.day === "21" || d.day === "28" ? "border-na-mint bg-na-mint-bg/30" : ""
                }`}
                data-testid={`day-${d.day}`}
              >
                <p className="text-xs font-semibold text-na-navy mb-1">Day {d.day}</p>
                <p className="text-[11px] leading-tight text-na-text-sec">{d.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section id="enroll" className="py-20 lg:py-24 bg-na-navy text-white" data-testid="agentic-enroll-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Trophy className="w-10 h-10 text-na-mint mx-auto mb-6" />
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium mb-4">
              Ready to Become an Agentic AI Engineer?
            </h2>
            <p className="text-base text-white/60 mb-8 max-w-xl mx-auto">
              28 days from zero to deploying production AI agents on AWS. 
              Limited seats per cohort. Reserve your spot now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/919265802045?text=Hi%20Neural%20Axis%2C%20I%27m%20interested%20in%20the%2028-Day%20Agentic%20AI%20Engineer%20Bootcamp.%20Please%20share%20enrollment%20details." target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-enroll-whatsapp">
                  Enroll via WhatsApp
                </Button>
              </a>
              <a href="tel:+919265802045">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-enroll-call">
                  <Phone className="w-4 h-4 mr-2" /> +91 9265 802 045
                </Button>
              </a>
              <a href="mailto:raj.yadav9312@gmail.com">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-enroll-email">
                  <Mail className="w-4 h-4 mr-2" /> Email Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-na-navy border-t border-white/10 text-center">
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className="text-sm text-white/40 hover:text-white/60 transition-colors" data-testid="agentic-back-home">
            ← Back to Homepage
          </Link>
          <Link to="/courses/generative-ai" className="text-sm text-white/40 hover:text-white/60 transition-colors">
            Other Courses
          </Link>
        </div>
      </footer>
    </div>
  );
}
