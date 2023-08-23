const sendToken = async (user, res, status, message, next) => {
  try {
    const token = await user.getToken(next)

    const options = {
      httpOnly: true,
      sameSite:"None",
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
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
