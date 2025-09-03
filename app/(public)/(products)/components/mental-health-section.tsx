import Image from "next/image"
import { Brain, Info, Dumbbell, HandHeart } from "lucide-react"

export function MentalHealthSection() {
  return (
    <div className="bg-secondary-100 ring-secondary-500/20 bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10">
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        Supporting your mental health
      </h2>
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) text-balance lg:text-lg">
        Obesity, being overweight mental health problems, such as depression and eating disorders, can negatively affect each other, making it harder to manage your weight. It's important to recognise the link between your mental health and your weight so you can seek help if you need it.
      </p>
      
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="shadow-secondary-950/10 ring-secondary-950/10 overflow-hidden rounded-2xl bg-white text-left text-pretty ring-1 lg:col-span-3">
            <div className="flex h-full items-center">
              <Image
                alt="Mounjaro injection pen for weight loss treatment"
                loading="lazy"
                width={150}
                height={279}
                className="hidden min-w-[150px] self-end pt-2 md:block"
                src="https://images.unsplash.com/photo-1745939921744-ba8ef27940bf?w=384&h=279&fit=crop&crop=center&auto=format&q=75"
              />
              <div className="p-4 lg:p-6">
                <h3 className="text-secondary-900 mt-0 mb-2 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl">
                  <Brain className="lucide lucide-brain text-secondary-500 h-5 w-5" />
                  Talking therapies
                </h3>
                <div className="prose">
                  <p>Cognitive Behavioral Therapy (CBT) can be effective for tackling the psychological challenges associated with eating disorders and obesity. It focuses on changing the way you think and behave, helping to break the cycle of negative thoughts and actions that can impact eating habits and body image.</p>
                  <p>To find a CBT therapist via the NHS, you can <a target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70" href="https://www.nhs.uk/service-search/mental-health/find-an-NHS-talking-therapies-service/">refer yourself</a> or speak to your GP, who can refer you to talking therapies in Northampton.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="shadow-secondary-950/10 ring-secondary-950/10 bg-white ring-1 rounded-2xl p-4 lg:p-6 text-pretty lg:col-span-2">
            <h3 className="text-secondary-900 mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl">
              <div className="text-secondary-500">
                <Info className="h-5 w-5" />
              </div>
              Why it's important
            </h3>
            <div className="text-left prose max-w-none">
              By addressing mental health alongside physical health, you have a much better chance of succeeding in your weight loss journey, improving your overall wellbeing and quality of life. If you find yourself in need of urgent mental health support, contact your <a target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70" href="https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline">local mental health helpline</a> provided by the NHS. These resources can provide immediate care and support in times of need, ensuring that no one has to face their challenges alone.
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="shadow-secondary-950/10 ring-secondary-950/10 bg-white ring-1 rounded-2xl p-4 lg:p-6 text-pretty lg:col-span-2">
            <h3 className="text-secondary-900 mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl">
              <div className="text-secondary-500">
                <Dumbbell className="h-5 w-5" />
              </div>
              Keeping active
            </h3>
            <div className="text-left prose max-w-none">
              <p>Exercise doesn't just burn calories. By triggering the release of endorphins, the body's natural mood enhancers, exercise has been shown to help combat depression and anxiety.</p>
              <p>There's plenty of ways to stay active in Northampton, from <a target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70" href="https://www.puregym.com/city/northampton">local gyms</a> and fitness classes to parks and recreational facilities.</p>
            </div>
          </div>
          
          <div className="shadow-secondary-950/10 ring-secondary-950/10 bg-white ring-1 rounded-2xl p-4 lg:p-6 text-pretty lg:col-span-3">
            <h3 className="text-secondary-900 mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl">
              <div className="text-secondary-500">
                <HandHeart className="h-5 w-5" />
              </div>
              Support in Northampton
            </h3>
            <div className="text-left prose max-w-none">
              <p>In Northampton, <a target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70" href="https://www.nhft.nhs.uk">Northamptonshire Healthcare NHS Foundation Trust</a> provides comprehensive mental health support. They can help with eating disorders and weight-related mental health issues.</p>
              <p>Discuss your mental health with your GP in Northampton who can refer you to a specialist. You may also be able to <a target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70" href="https://www.nhs.uk/service-search/mental-health/find-an-NHS-talking-therapies-service/">refer yourself</a> directly without a referral, but you will need to be registered with a GP to get talking therapies on the NHS. You can find a GP in Northampton on the <a target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70" href="https://www.nhs.uk/service-search/find-a-gp/results/Northampton">NHS website</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}