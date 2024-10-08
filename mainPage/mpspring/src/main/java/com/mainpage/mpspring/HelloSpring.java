package com.mainpage.mpspring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//@RestController : @Controller + @responseBody(반환값이 문자)

@Controller
//@RestController
public class HelloSpring {
	
	//부트에서는 기본적으로 컨트롤러를 사용할 수 없다.
	//그럼에도 사용하고 싶다면 RequestMapping 아래에 ResponseBody를 추가해준다.
	//그게 아니라면 RestController를 사용한다.
	
	//Rest 형식 : .action 같은 확장자를 붙이지 않고 실행하는 것.
	@RequestMapping("/hello")
	@ResponseBody
	public String hello() {
		
		//return "bbs/list";
		return "Hello Spring Boot!!!";
	}

}