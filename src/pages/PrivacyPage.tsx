import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <>
      <p>Privacy</p>
      // write 2000 words for privacy policy
      <p className="text-justify text-lg">
        Welcome to Netflix GPT, a simple web app that uses OpenAI's GPT-3 to
        generate movie and TV show descriptions based on user input. ChatGPT is
        a large language model trained by OpenAI that can generate human-like
        text based on the input it receives. This app uses ChatGPT to generate
        movie and TV show descriptions based on the input you provide. Give it a
        try by typing in a prompt and clicking the "Generate" button below! You
        can also choose from a list of pre-generated prompts by clicking the
        "Use Prompt" button write 2000 words
      </p>
      <p>
        This app is for demonstration purposes only and is not affiliated with
        Netflix or OpenAI. It was created by{' '}
        <Link to="/about" className="text-blue-600 underline">
          @jamesperet
        </Link>
      </p>
    </>
  );
};

export default PrivacyPage;
