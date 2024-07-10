<br/>
<p align="center"> 
  <p align="center">
jetPath plugin for file upload using busboy and dependent on nodej
    <br/>
    <br/>
    <a href="https://github.com/uiedbook/JetPath#examples"><strong>Explore JetPath APIs »</strong></a>
    <br/>
    <br/>
    <a href="https://t.me/uiedbookHQ">Join Community</a>
    .
    <a href="https://github.com/uiedbook/JetPath/issues">Report Bug</a>
    .
    <a href="https://github.com/uiedbook/JetPath/issues">Request Feature</a>
  </p>
</p>
 
--

## Installation

Install JetPath Right away on your project using npm or Javascript other package managers.

```
npm i jetpath --save
```

#### An hello App setup

```ts
import { JetPath } from "jetpath";
import { jetbusboy } from "jetbusboy";

const app = new JetPath({
  port: 9000,
});
app.use(jetbusboy);
app.listen();

// in your uploader.jet.js

// handler
export async function POST_upload(ctx: Context) {
  const form = await ctx.app.formData(ctx);
  console.log(form);
  if (form.image) {
    await form.image.saveTo(form.image.filename);
  }
  ctx.send(form);
}

// body validation and definition
export const BODY_: JetSchema = {
  body: {
    image: { type: "file", inputType: "file" },
    video: { type: "file", inputType: "file" },
    textfield: { type: "string", nullable: false },
  },
  method: "POST",
};
```

## Apache 2.0 Lincenced

Opensourced And Free.

Uiedbook is an open source, our vision is to make the web better, improving and innovating infrastructures for a better web experience.

You can [join]("https://t.me/UiedbookHQ") on telegram.
Ask your questions and contribute XD.

### Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code to be distributed under the MIT license. You are also implicitly verifying that all code is your original work.

### Support

Your contribution(s) is a good force for change anytime you do it, you can ensure JetPath's growth and improvement by contributing a re-occuring or fixed donations to:

https://www.buymeacoffee.com/fridaycandour

Or Click.

<a href="https://www.buymeacoffee.com/fridaycandour"><img src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=fridaycandour&button_colour=FFDD00&font_colour=000000&outline_colour=000000&coffee_colour=ffffff" /></a>
