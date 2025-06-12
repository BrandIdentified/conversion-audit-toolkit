// Trigger redeploy to activate X-Frame-Options header


import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'setHeight', height }, '*');
    };

    sendHeight();
    window.addEventListener('resize', sendHeight);

    return () => {
      window.removeEventListener('resize', sendHeight);
    };
  }, []);


  const questions = [
    {
      id: 'websiteClarity',
      category: 'Website Clarity & UX',
      prompt: 'How clear and intuitive is your homepage or landing page for a first-time visitor?',
      guide: '1 = Confusing or cluttered, 10 = Instantly communicates purpose and path',
    },
    {
      id: 'leadCapture',
      category: 'Lead Capture & Offer Hooks',
      prompt: 'How compelling and relevant is your lead magnet or conversion hook?',
      guide: '1 = None or generic, 10 = Irresistible and well-aligned with user pain points',
    },
    {
      id: 'messaging',
      category: 'Messaging & Copywriting',
      prompt: 'How persuasive and specific is your website copy?',
      guide: '1 = Vague or unclear, 10 = Clear, audience-focused, and benefit-driven',
    },
    {
      id: 'funnelFlow',
      category: 'Funnel Flow & Engagement',
      prompt: 'How well does your site guide users through a structured funnel or path?',
      guide: '1 = No clear flow, 10 = Intentional, step-by-step engagement funnel',
    },
    {
      id: 'followUp',
      category: 'Nurture & Follow-Up Systems',
      prompt: 'Do you have automated follow-ups for cold/warm/hot leads?',
      guide: '1 = None, 10 = Segmented and behavior-based nurturing in place',
    },
    {
      id: 'ctaClarity',
      category: 'Call-to-Action Clarity',
      prompt: 'Are your calls-to-action clear, visible, and aligned with user readiness?',
      guide: '1 = Weak or buried, 10 = Strong, frequent, and aligned with intent',
    },
    {
      id: 'mobileSpeed',
      category: 'Page Speed & Mobile Optimization',
      prompt: 'How well does your site perform on mobile devices?',
      guide: '1 = Slow or broken, 10 = Fast, responsive, and optimized for all devices',
    },
    {
      id: 'trustProof',
      category: 'Trust & Proof Elements',
      prompt: 'How well do you use testimonials, case studies, and credibility signals?',
      guide: '1 = None present, 10 = Prominent, relevant, and convincing proof',
    },
    {
      id: 'conversionTracking',
      category: 'Conversion Metrics & Tracking',
      prompt: 'Do you track key conversions and use data to optimize performance?',
      guide: '1 = No tracking or analytics, 10 = Events tracked, data used regularly',
    },
    {
      id: 'overallReadiness',
      category: 'Overall Conversion Readiness',
      prompt: 'Is your business equipped to convert traffic consistently?',
      guide: '1 = Not at all, 10 = Fully built for conversion and performance',
    },
  ];

  const handleChange = (e, id) => {
    setFormData({ ...formData, [id]: parseInt(e.target.value, 10) });
  };

  const getColorClass = (score) => {
    if (score <= 3) return 'bg-red-500';
    if (score <= 6) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getFix = (score) => {
    if (score <= 3) return 'This area is severely lacking. Begin by addressing foundational gaps immediately.';
    if (score <= 6) return 'There’s room for improvement. Optimize key elements to increase conversions.';
    return 'This area is performing well. Focus on fine-tuning and testing improvements.';
  };

  const calculateScore = () => {
    const values = Object.values(formData);
    const total = values.reduce((acc, val) => acc + (val || 0), 0);
    const avg = total / questions.length;
    setScore(avg.toFixed(1));
    setSubmitted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateScore();
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-5xl mx-auto mb-10 text-center">
      <div className="text-center mb-10">
  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Conversion Audit Toolkit</h1>
  <p className="text-lg text-gray-300">
    Evaluate how ready your website and business are to convert leads, build trust, and drive results.
  </p>
</div>
    </div>

      <div className="max-w-5xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((q) => (
              <div key={q.id} className="border-b border-gray-700 pb-6">
                <h2 className="text-xl font-semibold text-white mb-2">{q.category}</h2>
                <p className="text-gray-300 mb-1">{q.prompt}</p>
                <p className="text-sm text-gray-400 italic mb-3">{q.guide}</p>
                <select
                  value={formData[q.id] || ''}
                  onChange={(e) => handleChange(e, q.id)}
                  required
                  className="w-full border border-gray-600 rounded-md px-4 py-2 text-white text-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#17212D',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5rem 1.5rem',
                  }}
                >
                  <option value="">Select a score (1–10)</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
            type="submit"
            className="w-full bg-[#E2004B] text-white text-lg font-semibold px-6 py-3 rounded hover:opacity-90 transition"
            >
              Run My Audit
              </button>

          </form>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Your Conversion Score: {score} / 10</h2>
              <p className="text-lg text-gray-300 mt-2">Here’s how your business is performing across key conversion categories:</p>
            </div>

            {questions.map((q) => {
              const userScore = formData[q.id];
              const colorClass = getColorClass(userScore);
              const fix = getFix(userScore);

              return (
                <div key={q.id} className="bg-gray-700 p-5 rounded shadow-sm border border-gray-600">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold text-white">{q.category}</h3>
                    <span className="text-gray-300 font-medium">{userScore} / 10</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded h-4 mb-2">
                    <div className={`h-4 rounded ${colorClass}`} style={{ width: `${userScore * 10}%` }} />
                  </div>
                  <p className="text-sm text-gray-200 italic">{fix}</p>
                </div>
              );
            })}

            <div className="text-center mt-10 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Need help fixing the weak spots?</h3>
                <p className="text-gray-300">We can help you optimize these exact areas and rebuild your conversion systems with clarity and precision.</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://brandidentified.com/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
                >
                  Book a Strategy Call
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-500 transition"
                >
                  Run the Audit Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Force rebuild

