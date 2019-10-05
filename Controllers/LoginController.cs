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
    [HttpPost("[action]")]
    public IDictionary<string, string> AddUser([FromBody] MTUser data)
    {
      // MTUser.Save(data.getUserName(), data.getPassword(), data.getEmail());
      MTUser NewUser =  MTUser.getUserByName(data.getUserName());
      IDictionary<string, string> user = new Dictionary<string, string>();
      user.Add(new KeyValuePair<string, string>("username", NewUser.getUserName()));
      user.Add(new KeyValuePair<string, string>("password", NewUser.getPassword()));
      user.Add(new KeyValuePair<string, string>("email", NewUser.getEmail()));
      user.Add(new KeyValuePair<string, string>("userid", NewUser.getUserId().ToString()));
      return user;
    }
    [HttpPost("[action]")]
    public int UserLogin([FromBody] MTUser data)
    {
      int verifiedUser = MTUser.verifyUserLogin(data.getUserName(), data.getPassword());
      return verifiedUser;
    }

  }
}
