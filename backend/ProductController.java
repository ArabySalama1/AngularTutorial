package com.integrant.amazonws.controllers;


import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping(path = "/product")
public class ProductController {

  String jsonArr="[\n" +
          "    {\n" +
          "      \"productId\": \"1\",\n" +
          "      \"productName\": \"Leaf Rake\",\n" +
          "      \"productCode\": \"GDN-0011\",\n" +
          "      \"releaseDate\": \"March 19, 2019\",\n" +
          "      \"description\": \"Leaf rake with 48-inch wooden handle.\",\n" +
          "      \"price\": \"19.9555\",\n" +
          "      \"starRating\": \"3.2\",\n" +
          "      \"imageUrl\": \"assets/images/leaf_rake.png\"\n" +
          ",\"tags\": [\"rake\", \"leaf\", \"yard\", \"home\"]"+
          "    },\n" +
          "    {\n" +
          "      \"productId\": \"2\",\n" +
          "      \"productName\": \"Garden Cart\",\n" +
          "      \"productCode\": \"GDN-0023\",\n" +
          "      \"releaseDate\": \"March 18, 2019\",\n" +
          "      \"description\": \"15 gallon capacity rolling garden cart\",\n" +
          "      \"price\": \"32.99\",\n" +
          "      \"starRating\": \"4.2\",\n" +
          "      \"imageUrl\": \"assets/images/garden_cart.png\"\n" +
          "    },\n" +
          "    {\n" +
          "      \"productId\": \"5\",\n" +
          "      \"productName\": \"Hammer\",\n" +
          "      \"productCode\": \"TBX-0048\",\n" +
          "      \"releaseDate\": \"May 21, 2019\",\n" +
          "      \"description\": \"Curved claw steel hammer\",\n" +
          "      \"price\": \"8.9\",\n" +
          "      \"starRating\": \"4.8\",\n" +
          "      \"imageUrl\": \"assets/images/hammer.png\"\n" +
          "    },\n" +
          "    {\n" +
          "      \"productId\": \"8\",\n" +
          "      \"productName\": \"Saw\",\n" +
          "      \"productCode\": \"TBX-0022\",\n" +
          "      \"releaseDate\": \"May 15, 2019\",\n" +
          "      \"description\": \"15-inch steel blade hand saw\",\n" +
          "      \"price\": \"11.55\",\n" +
          "      \"starRating\": \"3.7\",\n" +
          "      \"imageUrl\": \"assets/images/saw.png\"\n" +
          "    },\n" +
          "    {\n" +
          "      \"productId\": \"10\",\n" +
          "      \"productName\": \"Video Game Controller\",\n" +
          "      \"productCode\": \"GMG-0042\",\n" +
          "      \"releaseDate\": \"October 15, 2018\",\n" +
          "      \"description\": \"Standard two-button video game controller\",\n" +
          "      \"price\": \"35.95\",\n" +
          "      \"starRating\": \"4.6\",\n" +
          "      \"imageUrl\": \"assets/images/xbox-controller.png\"\n" +
          "    }\n" +
          "  ]";
    ObjectMapper mapper = new ObjectMapper();
    List<Product> list=null;
    public ProductController() throws JsonParseException, JsonMappingException, IOException {
    	 list=new ArrayList<>(Arrays.asList(mapper.readValue(jsonArr, Product[].class)));
	}
  
  
    @GetMapping(path = "/products", produces = "application/json")
    @CrossOrigin
    @ResponseBody
    public List<Product> getProducts() throws IOException {
      
        return list;
    }
    
    
    @GetMapping(path = "/products/{id}", produces = "application/json")
    @CrossOrigin
    @ResponseBody
    public Product getProdcutById(@PathVariable("id") String id) throws IOException {
     
      
      Product p=list.stream().filter(prodcut -> id.equals(prodcut.getProductId()))
      .findAny()
      .orElse(null);
        return p;
    }
    
    @PutMapping(path = "/products/update", produces = "application/json")
    @CrossOrigin
    @ResponseBody
    public Product updateProductById(@RequestBody Product newObject) throws IOException {
      
    	if(newObject.getProductId()==null) {
    		String id=list.size()+1+"";
    		newObject.setProductId(id);
    		list.add(newObject);
    	}else {
    		list.set(list.indexOf(newObject),newObject);
    	}
      
        
        return newObject;
    }
}
