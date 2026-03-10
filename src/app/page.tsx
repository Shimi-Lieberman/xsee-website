import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowBreachesHappen from "@/components/HowBreachesHappen";
import ProductStoryScroll from "@/components/ProductStoryScroll";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import ProofEvidence from "@/components/ProofEvidence";
import AttackPathStory from "@/components/AttackPathStory";
import CloudAttackGraph from "@/components/CloudAttackGraph";
import SixEngines from "@/components/SixEngines";
import PlatformShowcase from "@/components/PlatformShowcase";
import SecurityBrain from "@/components/SecurityBrain";
import AttackSimulation from "@/components/AttackSimulation";
import CompetitiveDiff from "@/components/CompetitiveDiff";
import DemoMoment from "@/components/DemoMoment";
import Pricing from "@/components/Pricing";
import SecurityArchitecture from "@/components/SecurityArchitecture";
import SeeWhatXSEEFinds from "@/components/SeeWhatXSEEFinds";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowBreachesHappen />
        <ProductStoryScroll />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <ProofEvidence />
        <AttackPathStory />
        <CloudAttackGraph />
        <SixEngines />
        <PlatformShowcase />
        <SecurityBrain />
        <AttackSimulation />
        <CompetitiveDiff />
        <DemoMoment />
        <Pricing />
        <SecurityArchitecture />
        <SeeWhatXSEEFinds />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
