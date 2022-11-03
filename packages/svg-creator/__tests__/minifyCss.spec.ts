import { minifyCss } from "../css-utils";

it("should minify css", () => {
  expect(
    minifyCss(`
    .c {
        color  : red    ;
    }
    
    `)
  ).toBe(".c{color:red}");

  expect(
    minifyCss(`
    .c {
        top : 0;
        color  : red    ;
    }

    # { 
        animation: linear     10;
    }
    
    `)
  ).toBe(".c{top:0;color:red}#{animation:linear 10}");
});
