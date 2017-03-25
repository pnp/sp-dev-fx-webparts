#include <uv.h>
#include <v8.h>
#include <nan.h>

using namespace v8;

NAN_METHOD(Run) {
  Nan::HandleScope scope;
  uv_run(uv_default_loop(), UV_RUN_ONCE);
  info.GetReturnValue().Set(Nan::Undefined());
}

static NAN_MODULE_INIT(init) {
  Nan::Set(target, Nan::New("run").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(Run)).ToLocalChecked());
}

NODE_MODULE(deasync, init)
