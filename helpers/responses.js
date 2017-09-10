// @flow

// type Response = {
//   success: boolean,
//   message: ?string,
// };

// const sendSuccess = (response)
// const sendWithFailure = (response) => response.
// const sendResponse = ()

// const sendSuccessJson = (status: number, payload: Object = {}): void => {
//   try {
//     if (payload) res.status(status).json({
//       success: true,
//     })
//   } catch(err: Error) {
//     const { message } = err;
//     res.status(500).json({ message });
//   }
// }

const send200 = (res, json) => res.status(200).json({
  success: true,
  ...json,
});

const send201 = (res, json) => res.status(201).json({
  success: true,
  ...json,
});

const send400 = (res, message: ?string) => res.status(400).send({
  success: false,
  message: message || 'Bad request',
});

const send403 = (res, message: ?string) => res.status(404).send({
  success: false,
  message: message || 'Not authorized',
});

const defaultMessages = {
  400: 'Bad request',
  403: 'Not authorized',
  500: 'Server error',
};

const sendResponse = (res, status: number, payload: ?(Object | string)) => {
  try {
    if (typeof payload === 'string') {
      res.status(status).json({ message: payload });
    } else if (!payload) {
      const message = defaultMessages[status];
      if (message) res.status(status).json({ message });
      else res.sendStatus(status);
    } else {
      res.status(status).json(payload);
    }
  } catch (err) {
    res.status(500).json({ message: defaultMessages[500] });
  }
};

export default sendResponse;

// export default {
//   send200,
//   send201,
//   send400,
//   send403,
// };
