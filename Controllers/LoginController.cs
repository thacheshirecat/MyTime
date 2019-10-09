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
      MTUser.Save(data.getUserName(), data.getPassword(), data.getEmail());
      MTUser newuser =  MTUser.getUserByName(data.getUserName());
      IDictionary<string, string> user = new Dictionary<string, string>();
      user.Add(new KeyValuePair<string, string>("username", newuser.getUserName()));
      user.Add(new KeyValuePair<string, string>("password", newuser.getPassword()));
      user.Add(new KeyValuePair<string, string>("email", newuser.getEmail()));
      user.Add(new KeyValuePair<string, string>("sessionstartdate", newuser.getSessionStartDate()));
      user.Add(new KeyValuePair<string, string>("normalizedstarttime", newuser.getNormalizedStartTime()));
      user.Add(new KeyValuePair<string, string>("sessionstarttime", newuser.getSessionStartTime()));
      user.Add(new KeyValuePair<string, string>("userid", newuser.getUserId().ToString()));
      return user;
    }
    [HttpPost("[action]")]
    public IDictionary<string, string> UserLogin([FromBody] MTUser data)
    {
      Console.WriteLine("************" + data);
      int verifiedUser = MTUser.verifyUserLogin(data.getUserName(), data.getPassword());
      IDictionary<string, string> user = new Dictionary<string, string>();
      if(verifiedUser == 3)
      {
        MTUser founduser = MTUser.getUserByName(data.getUserName());
        user.Add(new KeyValuePair<string, string>("username", founduser.getUserName()));
        user.Add(new KeyValuePair<string, string>("password", founduser.getPassword()));
        user.Add(new KeyValuePair<string, string>("email", founduser.getEmail()));
        user.Add(new KeyValuePair<string, string>("sessionstartdate", founduser.getSessionStartDate()));
        user.Add(new KeyValuePair<string, string>("normalizedstarttime", founduser.getNormalizedStartTime()));
        user.Add(new KeyValuePair<string, string>("sessionstarttime", founduser.getSessionStartTime()));
        user.Add(new KeyValuePair<string, string>("userid", founduser.getUserId().ToString()));
      }
      else
      {
        MTUser erroruser = new MTUser("error", "error", "error", "error", "error", "error", 0);
        user.Add(new KeyValuePair<string, string>("username", erroruser.getUserName()));
        user.Add(new KeyValuePair<string, string>("password", erroruser.getPassword()));
        user.Add(new KeyValuePair<string, string>("email", erroruser.getEmail()));
        user.Add(new KeyValuePair<string, string>("sessionstartdate", erroruser.getSessionStartDate()));
        user.Add(new KeyValuePair<string, string>("normalizedstarttime", erroruser.getNormalizedStartTime()));
        user.Add(new KeyValuePair<string, string>("sessionstarttime", erroruser.getSessionStartTime()));
        user.Add(new KeyValuePair<string, string>("userid", erroruser.getUserId().ToString()));
      }
      return user;
    }

    [HttpPost("[action]")]
    public IDictionary<string, string> StartSession([FromBody] MTUser data)
    {
      Console.WriteLine("************" + data);
      MTUser founduser = MTUser.getUserByName(data.getUserName());
      founduser.setSessionStartDate(data.getSessionStartDate());
      founduser.setNormalizedStartTime(data.getNormalizedStartTime());
      founduser.setSessionStartTime(data.getSessionStartTime());

      IDictionary<string, string> user = new Dictionary<string, string>();
      user.Add(new KeyValuePair<string, string>("username", founduser.getUserName()));
      user.Add(new KeyValuePair<string, string>("password", founduser.getPassword()));
      user.Add(new KeyValuePair<string, string>("email", founduser.getEmail()));
      user.Add(new KeyValuePair<string, string>("sessionstartdate", founduser.getSessionStartDate()));
      user.Add(new KeyValuePair<string, string>("normalizedstarttime", founduser.getNormalizedStartTime()));
      user.Add(new KeyValuePair<string, string>("sessionstarttime", founduser.getSessionStartTime()));
      user.Add(new KeyValuePair<string, string>("userid", founduser.getUserId().ToString()));

      return user;
    }

    [HttpPost("[action]")]
    public void ApiTest([FromBody] MTUser data)
    {
      Console.WriteLine("************" + data);
    }
  }
}
