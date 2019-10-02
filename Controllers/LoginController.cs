using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTime.Models;

namespace MyTime.Controllers
{
  [Route("api/[controller]")]
  public class LoginController : Controller
  {
    private MTUser user1 = new MTUser { UserName = "Hopkin", Password = "pass123", Email = "hopkin@greenfrog.net", UserId = 1 };

    [HttpGet("[action]")]
    public MTUser UserData()
    {
      return user1;
    }
    [HttpPost("[action]")]
    public MTUser UpdateUser([FromBody] MTUser data)
    {
      MTUser updatedUser = new MTUser { UserName = data.UserName, Password = data.Password, Email = data.Email, UserId = data.UserId };
      return updatedUser;
    }
    [HttpPost("[action]")]
    public MTUser AddUser([FromBody] MTUser data)
    {
      MTUser NewUser = new MTUser { UserName = data.UserName, Password = data.Password, Email = data.Email, UserId = data.UserId };
      return NewUser;
    }
    [HttpPost("[action]")]
    public int UserLogin([FromBody] MTUser data)
    {
      int verifiedUser = MTUser.verifyUserLogin(data.UserName, data.Password);
      return verifiedUser;
    }

  }
}
