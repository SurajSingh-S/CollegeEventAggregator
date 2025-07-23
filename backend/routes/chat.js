// import express from 'express';
// import axios from 'axios';
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-4', // or 'gpt-3.5-turbo'
//       messages: [
//         { role: 'system', content: 'You are a helpful college event assistant.' },
//         { role: 'user', content: message }
//       ],
//       max_tokens: 150,
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     });

//     const reply = response.data.choices[0].message.content;
//     res.json({ reply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ reply: 'Sorry, something went wrong.' });
//   }
// });

// export default router;



import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo', // fallback for safer testing
      messages: [
        { role: 'system', content: 'You are a helpful college event assistant.' },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
});

export default router;
