package aws;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class Lambda implements RequestHandler<String, String> {

	@Override
	public String handleRequest(String input, Context context) {

		LambdaLogger logger = context.getLogger();
		logger.log("input ---" + input.toString());
		return input.toString();
	}

}
