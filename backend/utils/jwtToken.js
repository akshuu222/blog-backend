const sendToken = async (user, res, status, message, next) => {
  try {
    const token = await user.getToken(next)

    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    };

    res
      .status(status)
      .cookie("token", token, options)
      .json({ success: true, message, user });
  } catch (error) {
    return next(error);
  }
};

export default sendToken;