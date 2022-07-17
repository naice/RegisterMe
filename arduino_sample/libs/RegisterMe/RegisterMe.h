/*
 Name:		RegisterMe.h
 Author:	Jens Marchewka
*/

#ifndef _RegisterMe_h
#define _RegisterMe_h

#include "arduino.h"
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <JTimeout.h>

class RegisterMe {
public:
	RegisterMe(unsigned long timeoutDuration, const char * endpoint, const char * jsonPayload);
	~RegisterMe();
	void Loop();
private:
	JTimeout* _timeout;
	const char* _endpoint;
	const char* _jsonPayload;
};

#endif
