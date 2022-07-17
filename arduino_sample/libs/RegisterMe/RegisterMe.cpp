/*
 Name:		RegisterMe.cpp
 Author:	Jens Marchewka
*/

#include "RegisterMe.h"

RegisterMe::RegisterMe(unsigned long timeoutDuration, const char * endpoint, const char * jsonPayload)
{
	JTimeout * timeout = new JTimeout(timeoutDuration, true);
	_timeout = timeout;
	_endpoint = endpoint;
	_jsonPayload = jsonPayload;
}

RegisterMe::~RegisterMe()
{
	delete _timeout;
}

void RegisterMe::Loop()
{
	if (!_timeout->CanExecute()) {
		return;
	}

	HTTPClient http; 
	http.begin(_endpoint);
	http.addHeader("Content-Type", "application/json");
	String payload = String(_jsonPayload);
	payload.replace("%IP_ADDRESS%", WiFi.localIP().toString().c_str());
	int httpCode = http.POST(payload.c_str());
	http.end();

	if (httpCode != 200) {
		Serial.print("Error sending payload Server returned: ");
		Serial.print(httpCode);
		Serial.println();
	}
}
