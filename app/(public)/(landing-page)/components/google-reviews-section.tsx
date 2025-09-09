"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";

interface GoogleReview {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  reviewText: string;
  timeAgo: string;
  isVerified: boolean;
  profilePhotoUrl?: string;
  authorUrl?: string;
}

interface GoogleReviewsData {
  businessName: string;
  businessAddress: string;
  overallRating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  lastUpdated: string;
}

// Real Google Reviews from Regent Pharmacy's Google My Business
const realGoogleReviews: GoogleReview[] = [
  {
    id: "mahsa-karime",
    reviewerName: "Mahsa Karime",
    reviewerInitials: "MK",
    rating: 5,
    reviewText:
      "I had a great experience at the pharmacy. Mr. Mohammad Afzal was very kind and helpful. He listened carefully and gave us good advice for my mum's ear problem. Thank you so much for your support and care!",
    timeAgo: "a month ago",
    isVerified: true,
  },
  {
    id: "lindsy-rossouw",
    reviewerName: "Lindsy Rossouw",
    reviewerInitials: "LR",
    rating: 5,
    reviewText:
      "Regent Pharmacy are helping me to lose weight using Mounjaro. They have been kind, supportive and go the extra mile to make me feel comfortable. They are very knowledgeable and they have the best pricing on their product. A full rounded service and great value for money. We are so impressed, that my husband has now also joined.",
    timeAgo: "3 months ago",
    isVerified: true,
  },
  {
    id: "janine-jury",
    reviewerName: "Janine Jury",
    reviewerInitials: "JJ",
    rating: 5,
    reviewText:
      "Regent Pharmacy was recommended to me for WEIGHT LOSS by an Assistant in a Shop. Booking a health check was really simple. Service from Shaz in the Pharmacy was excellent and I can highly recommend. Follow up support is available face to face (much better than an app). I am saving £70 per month on previous supplier and it is a local service which I really like to support.",
    timeAgo: "2 months ago",
    isVerified: true,
  },
  {
    id: "molly",
    reviewerName: "Molly",
    reviewerInitials: "M",
    rating: 5,
    reviewText:
      "Amazing service from Regent Pharmacy! I was seen quickly and efficiently by the staff and in particular Ahmed, who was incredibly helpful and attentive. I came to the pharmacy for a second opinion after not feeling listened to at another pharmacy and immediately Ahmed made me feel listened to. He gave me his professional advice and after a quick trip to A&E, I returned to the pharmacy within the hour to pick up my prescription. Thank you so much for your hard work and attentiveness, as well as your genuine care for customers! :)",
    timeAgo: "6 months ago",
    isVerified: true,
  },
  {
    id: "sally-middleton",
    reviewerName: "Sally Middleton",
    reviewerInitials: "SM",
    rating: 5,
    reviewText:
      "I have been attending Regent pharmacy for Weight loss treatment and have found the staff to be very professional, informative and supportive. I have no hesitation recommending this pharmacy and with the knowledge that I can see somebody face-to-face rather than just online on get advice as and when.",
    timeAgo: "3 months ago",
    isVerified: true,
  },
  {
    id: "sisteray-35",
    reviewerName: "Sisteray 35",
    reviewerInitials: "S3",
    rating: 5,
    reviewText:
      "The gentleman had a lovely manner. Explained everything thoroughly to me regarding the weight loss injection. Showed me a youtube video on how to self administer. Very pleased with my experience here. Would recommend",
    timeAgo: "a month ago",
    isVerified: true,
  },
  {
    id: "zoe-harris",
    reviewerName: "Zoe Harris",
    reviewerInitials: "ZH",
    rating: 5,
    reviewText:
      "I used the weight loss clinic at Regent Pharmacy. My pharmacist was absolutely excellent and showed such care to ensure I was fully informed. I can't rate the customer service enough, super efficient and very kind!",
    timeAgo: "2 months ago",
    isVerified: true,
  },
  {
    id: "louise-hall",
    reviewerName: "Louise Hall",
    reviewerInitials: "LH",
    rating: 5,
    reviewText:
      "I have lost a stone is 27 days and feeling like I have never felt before. I'm happier, more confident, I know more about myself and understand myself. Shabus at regent pharmacy is totally fantastic and accommodating. He gives you tailored advice and support every time! Thank you for changing my life.",
    timeAgo: "2 months ago",
    isVerified: true,
  },
  {
    id: "sally-dunkley",
    reviewerName: "Sally Dunkley",
    reviewerInitials: "SD",
    rating: 5,
    reviewText:
      "Went to a local chemist called 'Chemist Near me', highly unprofessional, no questions asked just wanted to sell me the injections. Whereas, now I'm at regent pharmacy. Had lots of questions asked, got my blood pressure checked. They guided me through the whole process of weight loss journey. Thanks regent pharmacy for your amazing service.",
    timeAgo: "a month ago",
    isVerified: true,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function GoogleReviewsSection() {
  // Use real Google reviews directly - no API complexity needed
  const businessName = "Regent Pharmacy";
  const businessAddress = "10-11 Regent Square, Northampton";
  const overallRating = 4.2; // Actual Google rating
  const totalReviews = 223; // Total Google reviews
  const displayReviews = realGoogleReviews;

  // Show only first 6 reviews to keep the grid layout nice
  const reviewsToShow = displayReviews.slice(0, 6);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              width={32}
              height={32}
              className="mr-3"
            />
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Google Reviews
            </h2>
          </div>
          <p className="mt-4 text-xl text-gray-600">
            Real reviews from our customers on Google
          </p>
          <div className="mt-6 flex justify-center items-center space-x-4">
            <StarRating rating={Math.round(overallRating)} />
            <span className="text-lg font-semibold text-gray-900">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600">
              Based on {totalReviews} Google reviews
            </span>
          </div>

          {/* Google Business Info with verification link */}
          <div className="mt-4 flex justify-center items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {businessName}, {businessAddress}
            </span>
          </div>

          {/* Verification link */}
          <div className="mt-4">
            <a
              href="https://www.google.com/maps/place/Regent+Pharmacy,+Travel,+Weight+Management+and+Ear+Wax+Removal+Clinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                width={16}
                height={16}
                className="mr-2"
              />
              Verify reviews on Google Maps
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviewsToShow.map((review) => (
            <Card key={review.id} className="h-full border border-gray-200">
              <CardContent className="p-6">
                {/* Header with Google styling */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      {review.profilePhotoUrl ? (
                        <AvatarImage
                          src={review.profilePhotoUrl}
                          alt={review.reviewerName}
                        />
                      ) : null}
                      <AvatarFallback className="bg-blue-500 text-white text-sm">
                        {review.reviewerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.authorUrl ? (
                          <a
                            href={review.authorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors"
                          >
                            {review.reviewerName}
                          </a>
                        ) : (
                          review.reviewerName
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{review.timeAgo}</p>
                    </div>
                  </div>
                  {review.isVerified && (
                    <div className="text-xs text-blue-600 font-medium">
                      ✓ Verified
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={review.rating} />
                </div>

                {/* Review Text */}
                <blockquote className="text-gray-700 text-sm leading-relaxed">
                  {review.reviewText}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators with Google branding */}
        {/* <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-center items-center mb-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-lg font-semibold text-gray-900">
                Verified Google Reviews
              </span>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{overallRating.toFixed(1)}/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">9</div>
                <div className="text-sm text-gray-600">Recent 5★ Reviews</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              All reviews copied directly from Google My Business
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
