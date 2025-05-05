import { Upload, Vote, Award, DollarSign } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Upload Your Content",
    description: "Submit your videos, audio links, or pictures to showcase your talent.",
    icon: Upload,
  },
  {
    id: 2,
    title: "Community Voting",
    description: "Registered users vote on their favorite submissions.",
    icon: Vote,
  },
  {
    id: 3,
    title: "Get Rewarded",
    description: "The submission with the most votes receives a reward in stablecoin.",
    icon: Award,
  },
  {
    id: 4,
    title: "Platform Fee",
    description: "The platform charges a small flat fee for each submission.",
    icon: "Eth", // Placeholder for an Ethereum icon
  },
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy for creators to get discovered and rewarded for their talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon

            return (
              <div key={step.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
