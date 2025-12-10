"use client";
const repoData = [
  {
    repoLink: "https://github.com/ConsoleCzar-2/qr-on-site",
    maintainerName: "Abhirup Saha",
    repoDescription: "QR code Generator and Scanner website",
    repoTags: ["Cryptography"],
    maintainerDiscordId: "chokhe_jol_jibon_lol",
    readmeSetupDone: true,
    contributionSetupDone: true,
    issuesCreated: "Work in progress"
  },
  {
    repoLink: "https://github.com/datavorous/tinytracer",
    maintainerName: "Sagnik Bhattacharjee",
    repoDescription: "A tiny path tracer",
    repoTags: ["graphics programming"],
    maintainerDiscordId: "datavorous_",
    readmeSetupDone: true,
    contributionSetupDone: true,
    issuesCreated: "Done"
  },
  {
    repoLink: "https://github.com/saral-gupta7/dodge-objects",
    maintainerName: "Saral Gupta",
    repoDescription: "Dodge Falling Objects",
    repoTags: ["Web Fundamentals", "DOM Manipulation"],
    maintainerDiscordId: "saralxgupta",
    readmeSetupDone: true,
    contributionSetupDone: true,
    issuesCreated: "Work in progress"
  },
  {
    repoLink: "https://github.com/Asif-Tanvir-2006/very_vulnerable",
    maintainerName: "Sk. Asif Tanvir",
    repoDescription: "Vulnerable Repo",
    repoTags: ["patch vulnerabilities"],
    maintainerDiscordId: "iampanda2395",
    readmeSetupDone: true,
    contributionSetupDone: true,
    issuesCreated: "Not started"
  },
  {
    repoLink: "https://github.com/Mahos-H/otp-generator",
    maintainerName: "Soham Halder",
    repoDescription: "OTP generator",
    repoTags: ["Cryptography"],
    maintainerDiscordId: null,
    readmeSetupDone: true,
    contributionSetupDone: true,
    issuesCreated: "Done"
  },
  {
    repoLink: "https://github.com/cneuralnetwork/inwhale",
    maintainerName: "Deepon Halder",
    repoDescription: "Quantization Library",
    repoTags: ["ML", "Quantization"],
    maintainerDiscordId: "neuralnetworking",
    readmeSetupDone: true,
    contributionSetupDone: true,
    issuesCreated: "Not started"
  }
];

import React from "react";

const statusColors: Record<string, string> = {
  "Done": "bg-green-500/20 text-green-400",
  "Work in progress": "bg-yellow-500/20 text-yellow-400",
  "Not started": "bg-red-500/20 text-red-400"
};

export const RepoPage = () => {
  return (
    <div className="w-full min-h-screen xl:max-w-[1280px]  mx-auto  text-neutral-200 p-8">
      <h1 className="text-3xl font-semibold mb-8 text-neutral-100">
        Repository Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repoData.map((repo, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 
                       shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 
                       transition-all duration-200"
          >
            <div className="flex flex-col gap-3">

      
              <a
                href={repo.repoLink}
                target="_blank"
                className="text-lg font-semibold text-blue-400 hover:underline"
              >
                {repo.repoDescription}
              </a>

      
              <p className="text-neutral-400 text-sm">
                by {repo.maintainerName}
              </p>

            
              <div className="flex flex-wrap gap-2 mt-2">
                {repo.repoTags.map((tag, t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-neutral-700/40 text-neutral-300 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

             
              <div className="text-sm mt-3">
                <span className="font-medium text-neutral-300">Discord:</span>{" "}
                {repo.maintainerDiscordId || "Not provided"}
              </div>

              

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};