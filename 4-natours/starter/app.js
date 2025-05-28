const express = require('express');
const fs=require('fs');
const { get } = require('http');
const morgan = require('morgan');
const app=express();

//1.Middleware
app.use(express.json());
app.use(morgan('dev'));
// Middleware to log requests

app.use((req,res,next) => {
    console.log('Hello from the middleware!');
    next();
}); 
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.headers);
    next();
});

// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message:'Hello from the server side!',
//         app:'Natours'
//     });
// });

// app.post('/',(req,res)=>{
//     res.send('You can post to this endpoint...')
// });

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2.Routes
const getAllTours=(req,res)=>{
    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    });
}
const getTour=(req,res)=>{
    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id);
    if(!tour){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tour
        }
    });
}
const createTour=(req,res)=>{
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
        });
    });
}
const updateTour=(req,res)=>{
    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id);
    if(!tour){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    Object.assign(tour,req.body);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    });
}
const deleteTour=(req,res)=>{
    const id=req.params.id*1;
    const tourIndex=tours.findIndex(el=>el.id===id);
    if(tourIndex===-1){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    tours.splice(tourIndex,1);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(204).json({
            status:'success',
            data:null
        });
    });
}
// 3.API Endpoints

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// 4.Starting the server

const port=3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});