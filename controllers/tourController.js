const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (_req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};

exports.getSingleTour = (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'Not Found',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};

exports.createTour = (req, res) => {
  const id = tours.length + 1;
  const newTour = Object.assign({ id }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      updatedTour: tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  // const tour = tours.find(tour => tour.id == req.params.id)
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
