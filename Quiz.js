const express = require("express")
const {database} = require("./database")

const QuizRouter = express.Router()


QuizRouter.get("/GetQuiz/:id",(req,res)=> {
        const user_id = req.params.id
    console.log(user_id)

        database.query("SELECT * FROM modules WHERE teacher_id = ?",[user_id],(err,results)=> {
        if (err) {
            throw err
        }

        res.json({quiz : results})
    })
})

QuizRouter.get("/DeleteQuiz/:id",(req,res)=> {
         const quiz_id = req.params.id
    console.log(quiz_id)

        database.query("DELETE FROM modules WHERE module_id = ?",[quiz_id],(err,results)=> {
        if (err) {
            throw err
        }

        res.json({status : "success"})
    })
})


QuizRouter.post("/CreateQuiz",async(req,res)=> {
    const {Quiz,Topic,teacher_id} = req.body


      try {
        await database.promise().beginTransaction();

        const [existing] = await database.promise().query(
            "SELECT * FROM modules WHERE module_name = ?",
            [Topic]
        );

        if (existing.length > 0) {
            await database.promise().rollback();
            return res.json({ status: "topic exist" });
        }

        const [moduleResult] = await database.promise().query(
            "INSERT INTO modules (module_name, description,teacher_id) VALUES (?, ?,?)",
            [Topic, "A quiz",teacher_id]
        );

        const moduleId = moduleResult.insertId;

        for (const quiz of Quiz) {
            const [questionResult] = await database.promise().query(
                "INSERT INTO questions (module_id, question_text, answer) VALUES (?, ?, ?)",
                [moduleId, quiz.Question, quiz.Answer]
            );

            const questionId = questionResult.insertId;

            const options = Object.values(quiz.Options);

for (let i = 0; i < options.length; i++) {
    await database.promise().query(
        "INSERT INTO options (question_id, option_text) VALUES (?, ?)",
        [questionId, options[i]]
    );



}
        }

        await database.promise().commit();
        res.json({ status: "success" });

    } catch (err) {
        await database.promise().rollback();
        console.error(err);
        res.status(500).json({ status: "error" });
    }

    
})




QuizRouter.get("/GetTopics",(req,res)=> {
    database.query("SELECT * FROM modules",(err,results)=> {

        if (err) {
            throw err
        }


        res.json({result : results})

    })
})


QuizRouter.post("/GetQuestions",(req,res)=> {
    const {id} = req.body

    database.query("SELECT * FROM questions WHERE module_id = ?",[id],(err,results)=> {

        if (err) {
            throw err
        }


        res.json({result : results})

    })
})

QuizRouter.get("/GetOptions/:id",(req,res)=> {
    const question_id = req.params.id
    console.log(question_id)

     database.query("SELECT * FROM options WHERE question_id = ?",[question_id],(err,results)=> {

        if (err) {
            throw err
        }


        res.json({result : results})

    })

})


module.exports = {
    QuizRouter
}

