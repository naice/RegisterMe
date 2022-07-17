#include <RegisterMe.h>

const char * registerMePayload = 
  "{"
  " \"name\": \"GarageESP\","
  " \"ip\": \"%IP_ADDRESS%\","
  " \"endpoints\": {"
  "  \"POST_relay\": \"/relay\","
  "  \"GET_info\": \"/\""
  " }"
  "}"
;
// automatically transmit current ip to register service every minute. (keep alive, ip may change..)
RegisterMe registerMe(1000*60, "http://192.168.178.88:4711/register", registerMePayload);


void setup() {
    // setup server...
}

void loop() {
  registerMe.Loop();
}
