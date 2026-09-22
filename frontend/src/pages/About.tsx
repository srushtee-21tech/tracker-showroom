import React from 'react';
import { Navigation, ShieldCheck, Target, Eye, Award, CheckCircle2, Building, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-left relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-800">
            <Building className="w-3.5 h-3.5" /> Corporate Showroom Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Enterprise Tracking & Telemetry Showroom
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Tracker Showroom is a specialized commercial distribution network dedicated to testing, showcasing, and deploying industrial-grade GPS locators, OBD diagnostics units, and IoT telemetry hardware.
          </p>
        </div>
      </div>

      {/* Mission, Vision, Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To provide logistics fleets, commercial enterprises, and personal security clients with factory-certified tracking hardware backed by hands-on showroom demonstrations and professional vehicle installation support.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To set the benchmark for commercial GPS telemetry distribution by bridging hardware innovation with real-world physical experience centers across major transport hubs.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Core Values</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hardware precision, strict testing compliance, transparent warranty support, and unyielding data privacy protection for enterprise vehicle telemetry streams.
          </p>
        </div>
      </div>

      {/* Business Information Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Official Business Information</span>
          <h2 className="text-2xl font-bold text-white mt-1">Hardware Certification & Security Standards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">FCC & CE Certification</h4>
              <p className="text-slate-400 mt-0.5">All catalog tracking devices comply with global radio-frequency and electromagnetic safety standards.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">IP67 & IP68 Waterproof Ratings</h4>
              <p className="text-slate-400 mt-0.5">Ruggedized enclosures built to withstand sub-zero temperatures, dust, vibration, and submersion.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">CAN-bus Diagnostic Telemetry</h4>
              <p className="text-slate-400 mt-0.5">Direct reading of vehicle ECU data without voiding manufacturer vehicle warranties.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">256-bit Encrypted Telemetry</h4>
              <p className="text-slate-400 mt-0.5">Secure SSL/TLS encrypted payload transmission from SIM modules to cloud servers.</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
          <span className="font-bold text-cyan-400 block mb-1">Corporate Information Placeholder Note:</span>
          This section is structured to host official corporate registration numbers, tax identifiers, and legal business address details upon production onboarding.
        </div>
      </div>
    </div>
  );
};
