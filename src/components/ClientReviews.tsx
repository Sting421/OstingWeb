import React from 'react';

interface Review {
  text: string;
  author: string;
}

const ClientReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      text: "Austin is great! He helped me find and purchase a great buy. It was a very competitive deal and there were a lot of offers, and Austin was able to help me get my offer accepted and close on the deal. Austin was so on top of things and very responsive. He addressed all my questions. He knows the Columbus market very well. I would definitely highly recommend him. He is a great real estate agent and I'm so thankful for his help!",
      author: "grisantijl"
    },
    {
      text: "Austin was easy to work with and had ready some great online tools to make the buying process easy to understand. He was always available to answer any question I had.",
      author: ""
    },
    {
      text: "Austin has been a wealth of help in getting our first investment property in Columbus. He was quick to respond and went above and beyond in everything he did for us.",
      author: "getflipd llc"
    },
    {
      text: "Austin has been an amazing realtor from start to beginning. Always professional and very friendly. Worked with us through every process and helped us get my very first purchase and was able to close very quickly. Definitely recommend!",
      author: "kawa8995"
    },
    {
      text: "Austin did an incredible job supporting our search for an investment property. As out of state investors, his local knowledge was invaluable. He was patient, informative and went above and beyond for us. It is because of him we felt so comfortable entering the Columbus market. Austin was always available to us and offered counsel. I look forward to working with him again and highly recommend to anyone with confidence.",
      author: "valerieannleary"
    },
    {
      text: "Austin was a great agent to work with buying my first investment property. He is very knowledgeable. I would recommend him to anyone looking for investment properties in Columbus and the surrounding areas!",
      author: "K.W 1"
    },
    {
      text: "Austin was fantastic to work with from start to finish in selling our property. He was very responsive and available to me pretty much anytime in the day (even with me being on Pacific time) he was always professional and gave us excellent advice throughout process. I recommended Austin to anyone looking to buy or sell in Ohio.",
      author: "perchviewproperties"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Client Reviews
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            See what our clients have to say about working with Austin
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex-grow">
                <p className="text-gray-600 italic mb-4">"{review.text}"</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-medium text-gray-900">— {review.author || "Anonymous"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
